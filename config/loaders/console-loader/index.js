module.exports = function (content) {
  console.log(content);
  this.callback(null, content);
  return;
};
