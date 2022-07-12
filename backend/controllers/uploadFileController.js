const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIA5QVBTUD3W4PVLNBA",
  secretAccessKey: "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",
});

exports.uploadeFiles = catchAsyncError(async (req, res, next) => {
  const file = req.files.file[0];
  fs.readFile(file.path, (err, data) => {
    console.log("gfgn", data);
    if (err) throw err;
    const params = {
      Bucket: "test-bucket-2000", // pass your bucket name
      Key: `${file.filename}`, // file will be saved in <folderName> folder
      Body: data,
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
      const pathToFile = "./public/files/" + file.filename;
      if (fs.existsSync(pathToFile)) {
        fs.unlinkSync(pathToFile);
      }
      res.status(200).send("file is uploaded");
    });
  });
});
