const { customEmitter } = require("./image-module");


const getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }
  const images = { images: req.body.images }
  customEmitter.emit('processImages', images);
  return res.json(images);
};


module.exports = {
  getResult
}