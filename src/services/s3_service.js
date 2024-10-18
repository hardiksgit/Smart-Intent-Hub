const AWS = require("aws-sdk");
const path = require("path");

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
});

exports.s3_upload = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${path.basename(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return await s3.upload(params).promise();
};
