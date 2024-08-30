
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });



export const uploadToS3 = async (images: File[]): Promise<string[]> => {
  const uploadedUrls: string[] = [];

  const s3 = new AWS.S3({
    accessKeyId: "AKIAU6GD2ADGEWNXOOU4",
    secretAccessKey: "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",
    region: "us-east-2",
  });

  for (const file of images) {
    const params = {
      Bucket: "ai-rental-images",
      Key: `${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      uploadedUrls.push(data.Location); // Store the uploaded file URL
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  return uploadedUrls; // Return the array of uploaded URLs
};


export const uploadVideoToS3 = async (video: File | null): Promise<string | null> => {
  if (!video) {
    console.error('No video file provided.');
    return null;
  }

  const s3 = new AWS.S3({
    accessKeyId: "AKIAU6GD2ADGEWNXOOU4",
    secretAccessKey: "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",
    region: "us-east-2",
  });

  const params = {
    Bucket: "ai-rental-images",
    Key: `${Date.now()}_${video.name}`,
    Body: video,
    ContentType: video.type,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // The URL of the uploaded video
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};
