const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dxje4cd56', 
  api_key: '228979642771635', 
  api_secret: 'vgw183QZ8PWNTZp5QyWAJY7CqLE' 
});


const uploadImage = async (path) => {
  if (!path) return;
  try {
      const result = await cloudinary.uploader.upload(path);
      console.log("File has been uploaded to Cloudinary");
      return result;
  } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return false;
  }
};

module.exports = uploadImage;