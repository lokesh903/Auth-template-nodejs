const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

// Function to compress, resize, and save an image using sharp
const compressAndSaveImage = async (file, destination, allowedTypes, fieldName) => {
  try {
    // Validate file type
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error(`Unsupported file type in ${fieldName}. Only ${allowedTypes.join(", ")} are allowed.`);
    }

       // Check if the file is not empty
       if (file.size === 0) {
        throw new Error(`File in ${fieldName} is empty.`);
      }
  
      const image = sharp(file.data);
  
      // Get image metadata to determine current dimensions and size
      const metadata = await image.metadata();
      logger.info(`Image Metadata for ${file.name}:`, metadata);
  
      // Check if metadata is valid
      if (!metadata.width || !metadata.height || metadata.width <= 0 || metadata.height <= 0) {
        throw new Error(`Invalid image dimensions for ${file.name}: width=${metadata.width}, height=${metadata.height}.`);
      }
  
      // Set minimum dimensions for resizing
      const minDimension = 2; // You can adjust this value as needed
      const originalWidth = metadata.width;
      const originalHeight = metadata.height;
  
      // Calculate resize dimensions to reduce dimensions by 25%
      let targetWidth = Math.floor(originalWidth * 0.75);
      let targetHeight = Math.floor(originalHeight * 0.75);
  
      // Ensure that the dimensions are not smaller than the minimum dimension
      if (targetWidth < minDimension || targetHeight < minDimension) {
        targetWidth = originalWidth;
        targetHeight = originalHeight;
        logger.warn(`Skipping resizing for ${file.name} due to small dimensions.`);
      }
  

    // Compress the image
    const compressedBuffer = await image
      .resize(targetWidth, targetHeight)
      .jpeg({ quality: 75 }) // Assuming 75% quality to reduce file size
      .toBuffer();

    // Generate filename and save the resized, compressed image
    const fileName = `${Date.now()}-${file.name.toLowerCase().replace(/\s+/g, "-")}`;
    const filePath = path.join(destination, fileName);
    fs.writeFileSync(filePath, compressedBuffer);

    return {
      filePath,
      fileName,
      newWidth: targetWidth,
      newHeight: targetHeight,
    };
  } catch (error) {
    logger.error(`Error compressing and saving image: ${error.message}`);
    throw error;
  }
};

// Function to handle single image upload (JPEG or PNG only)
const uploadSingleImage = async (imageFile, destination, fieldName) => {
  try {
    return await compressAndSaveImage(imageFile, destination, ["image/png", "image/jpeg"], fieldName);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Function to handle multiple image upload (JPEG or PNG only)
const uploadMultipleImages = async (imageFiles, destination, fieldName, min = 3, max = 5) => {
  try {
    imageFiles = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
    if (imageFiles.length < min || imageFiles.length > max) {
      throw new Error(`Field ${fieldName} must contain between 3 and 5 images.`);
    }
    const uploadedFiles = [];

    for (const file of imageFiles) {
      const { filePath, fileName } = await compressAndSaveImage(file, destination, ["image/png", "image/jpeg"], fieldName);
      uploadedFiles.push({ filePath, fileName });
    }

    return uploadedFiles;
  } catch (error) {
    logger.error(`Error uploading multiple images: ${error.message}`);
    throw error;
  }
};

// Function to handle PDF upload
const uploadPDF = async (pdfFile, destination, fieldName) => {
  try {
    // Validate file type
    if (pdfFile.mimetype !== "application/pdf") {
      throw new Error(`Unsupported file type ${fieldName}. Only application/pdf is allowed.`);
    }
    const fileName = `${Date.now()}-${pdfFile.name.toLowerCase().replace(/\s+/g, "-")}`;
    const filePath = path.join(destination, fileName);
    await pdfFile.mv(filePath);

    return { filePath, fileName };
  } catch (error) {
    logger.error(`Error uploading PDF: ${error.message}`);
    throw error;
  }
};

module.exports = { uploadSingleImage, uploadMultipleImages, uploadPDF };
