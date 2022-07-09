const Product = require("../model/product");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe("Products", () => {
  beforeEach(() => {
    //Before each test we empty the database
    Product.remove({}, (err) => {
      //    done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET products", () => {
    it("it should GET all the products", () => {
      chai
        .request(app)
        .get("/product")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          //   done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST product", () => {
    it("it should not POST a product without field", () => {
      let product = {
        Name: "The Lord of the Rings",
        Price: 1500,
        Stock: 15,
      };
      chai
        .request(app)
        .post("/product/create")
        .send(product)
        .end((err, res) => {
            console.log(res)
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.should.have.property("success").eql(true);
          res.body.book.should.have.property("Name");
          res.body.book.should.have.property("Price");
          res.body.book.should.have.property("Stock");
        });
    });
  });
  describe("/GET/:id product", () => {
    it("it should GET a product by the given id", () => {
      let product = new Product({ Name: "bvcb", Price: 150, Stock: 5 });
      product.save((err, product) => {
        chai
          .request(app)
          .get("/product/" + product.id)
          .send(product)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.book.should.have.property("Name");
            res.body.book.should.have.property("Price");
            res.body.book.should.have.property("Stock");
            res.body.should.have.property("_id").eql(book.id);
          });
      });
    });
  });
});
