const express = require("express");
const passport = require("passport");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/ProductController");
const router = express.Router();
// passport.authenticate("jwt", { session: false });
router.route("/").get(getAllProducts);
router.route("/:id").get(getSingleProduct);
router.route("/create").post(createProduct);
router.route("/:id").put(updateProduct);
router.route("/:id").delete(deleteProduct);

module.exports = router;
