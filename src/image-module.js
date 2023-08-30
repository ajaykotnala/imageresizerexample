
const path = require('path');
const EventEmitter = require('events');
const customEmitter = new EventEmitter();
const fs = require("fs")
const sharp = require('sharp');

const srcdir = './uploads/source/';
const distdir = './uploads/destination/';


customEmitter.on('processImages', (data) => {
    
  const { images } = data;
  for(let image of images) {
    const ext = image.split('.')?.[1];
    const filePath = srcdir + image;
    const compressedFilePath = distdir + image;

    fs.readFile(filePath, async function (error, data) {

      if (error) return false;
      await sharp(data)
    .jpeg({ quality: 80 })
    .toFile(compressedFilePath);

      fs.unlink(filePath, function (error) {
          if (error) throw error
      })
    })

  }

});
 
module.exports = {
  customEmitter
}
