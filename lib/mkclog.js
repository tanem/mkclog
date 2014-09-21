var sh = require('execSync');
var Readable = require('stream').Readable;

var rs = module.exports = new Readable();

rs.setTag = function(tag){
  rs.tag = tag;
};

rs._read = function(){
  var sortedTags = sortDescending(getTags());
  var output = generateOutput(sortedTags);
  if (rs.tag) {
    var tagHeader = generateTagHeader(rs.tag, generateTagHeaderDate());
    var tagBody = generateTagBody(sortedTags[0], 'HEAD');
    output = tagHeader + tagBody + output;
  }
  rs.push(output);
  rs.push(null);
};

function getTags() {
  var tags = sh.exec('git tag').stdout.split('\n');
  tags.pop();
  return tags;
}

function sortDescending(tags) {
  return tags.sort(function(a, b){
    var regex = /^v?(\d+)\.(\d+)\.(\d+)$/;

    var aVersions = a.match(regex).slice(1);
    var bVersions = b.match(regex).slice(1);
    
    var majorVersionCompare = bVersions[0] - aVersions[0];
    if (majorVersionCompare !== 0) return majorVersionCompare;
    
    var minorVersionCompare = bVersions[1] - aVersions[1];
    if (minorVersionCompare !== 0) return minorVersionCompare;
    
    return bVersions[2] - aVersions[2];
  });
}

function generateOutput(tags) {
  var str = '';
  tags.reduce(function(previous, current, index, array){
    str += generateTagHeader(previous, generateTagHeaderDate(previous));
    str += generateTagBody(current, previous);
    if (index === array.length - 1) {
      str += generateTagHeader(current, generateTagHeaderDate(current));
      str += generateTagBody(current);
    }
    return current;
  });
  return str;
}

function generateTagHeader(tag, date) {
  return '## ' + tag + ' / ' + date + '\n\n';
}

function generateTagHeaderDate(tag) {
  var cmd = 'git show -s --format=%ci ' + (tag || '');
  return sh.exec(cmd).stdout.substr(0, 10);
}

function generateTagBody(tagA, tagB) {
  var cmd = 'git log --no-merges --format=" * %s" ' + tagA;
  if (tagB) cmd += '..' + tagB;
  return sh.exec(cmd).stdout + '\n';
}