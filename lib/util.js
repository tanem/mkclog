exports.lpad = function(str, num){
  var pad = '';
  while (num--) pad += ' ';
  return pad + str;
};