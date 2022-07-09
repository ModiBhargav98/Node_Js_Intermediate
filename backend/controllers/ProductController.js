const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const Product = require("../model/product");
const sendMail = require("../utils/sendEmail");

// find all products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// find single product details
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  console.log("bgfc1",req.body)
  const product = await Product.create(req.body);
  // const mailText =
  //   `<h3>Hello User<h3> + <div><p>Your Product is Successfully Created</p><p>Your Avilable Stock ${product.Stock}</p></div>`;
  // const mailResult = await sendMail("Create data", req.body.Name,mailText);
  // console.log(mailResult,product)
  console.log("bgfc",product)
  res.status(200).json({
    success: true,
    product,
    
  });
});

// update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  console.log(req.params.id)
  let product = await Product.findById(req.params.id);
  console.log(product);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  let products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(products);
  const mailText =
  `<h3>Hello User<h3> + <div><p>Your Product is Successfully Created</p><p>Your Avilable Stock ${req.body.Stock}</p></div>`;
const mailResult = await sendMail("Update data", req.body.Name,mailText);
console.log(mailResult,product)
  res.status(200).json({
    success: true,
    products,
  });
});
// DELETE PRODUCT
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product are deleted",
  });
});
