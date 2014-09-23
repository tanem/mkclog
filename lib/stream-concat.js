var stream = require('stream');

module.exports = function(){
  return new StreamConcat();
};

function StreamConcat(){
  stream.Transform.call(this, { objectMode: true });
}

StreamConcat.prototype = Object.create(stream.Transform.prototype);

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