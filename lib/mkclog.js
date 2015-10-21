var execSync = require('child_process').execSync;
var Readable = require('stream').Readable;
var util = require('util');
var path = require('path');
var semver = require('semver');
var packageJSONPath = path.join(process.cwd(), 'package.json');
var packageJSON = require(packageJSONPath);

var Mkclog = module.exports = function Mkclog() {
  if (!(this instanceof Mkclog)) return new Mkclog();
  Readable.call(this);
};

util.inherits(Mkclog, Readable);

Mkclog.prototype.setAll = function(all){
  this.all = all;
};

Mkclog.prototype.setTag = function(tag){
  this.tag = getNewSemver(tag);
};

Mkclog.prototype.setUrl = function(url){
  if (url) this.url = url.split(/\/$/)[0];
};

Mkclog.prototype._read = function(){
  if (execSync('git log').toString().code) {
    console.log('No commits found.');
    process.exit(1);
  }
  var sortedTags = sortDescending(getTags());
  var hasTags = sortedTags.length;
  var latestTagHeader = generateTagHeader(this.tag || '?', generateTagHeaderDate());
  var latestTagBody;
  if (hasTags) latestTagBody = generateTagBody(this.url, sortedTags[0], 'HEAD');
  else latestTagBody = generateTagBody(this.url);
  var output = latestTagHeader + latestTagBody;
  if (hasTags && this.all) output += generateAll(this.url, sortedTags);
  this.push(output);
  this.push(null);
};

function getTags() {
  var tags = execSync('git tag').toString().split('\n');
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

function generateAll(url, tags) {
  var str = '';
  tags.reduce(function(previous, current, index, array){
    str += generateTagHeader(previous, generateTagHeaderDate(previous));
    str += generateTagBody(url, current, previous);
    if (index === array.length - 1) {
      str += generateTagHeader(current, generateTagHeaderDate(current));
      str += generateTagBody(url, current);
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
  return execSync(cmd).toString().substr(0, 10);
}

function generateTagBody(url, tagA, tagB) {
  var format = ' * ';
  if (url) format += '([%h](' + url + '/commit/%H)) ';
  format += '%s';
  var cmd = 'git log --no-merges --format="' + format + '"';
  if (tagA) cmd += ' ' + tagA;
  if (tagB) cmd += '..' + tagB;
  var output = execSync(cmd).toString() + '\n';
  output = addIssueLinks(url, output);
  return output;
}

function addIssueLinks(url, str) {
  return str.replace(/#(\d+)/g, '[$&](' + url + '/issues/$1)');
}

function getNewSemver(newVersion) {
  var newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(packageJSON.version, newVersion);
  if (!newSemver) throw new Error('Invalid new version');
  return newSemver;
}