var Transform = require('stream').Transform;
var util = require('util');

var StreamConcat = module.exports = function StreamConcat(){
  if (!(this instanceof StreamConcat)) return new StreamConcat();
  Transform.call(this, { objectMode: true });
};

util.inherits(StreamConcat, Transform);

StreamConcat.prototype._transform = function(stream, encoding, done){
  var dataHandler = function(chunk){
    this.push(chunk);
  }.bind(this);
  stream.on('data', dataHandler);
  stream.on('end', function(){
    stream.removeListener('data', dataHandler);
    done();
  });
};