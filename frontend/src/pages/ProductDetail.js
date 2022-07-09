import React, { useState, useEffect } from "react";
import CustemerService from "../CourseServices/productManagement";
export default function ProductDetail() {
  const [productData, setProductData] = useState({
    Name: "",
    Price: "",
    Stock: "",
  });
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [confrimBox, setConfirmBox] = useState(false);

  useEffect(() => {
    CustemerService.getAllProudct().then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
    });
  }, [confrimBox]);

  const handleSubmitAndEdit = () => {
      if(productId === ""){
        CustemerService.CreateProudct(productData)
        .then((res) => {
          setConfirmBox(!confrimBox)
          setProductData({
            Name: "",
            Price: "",
            Stock: "",
          });
        })
        .catch((err) => console.log(err));
      }else{
        CustemerService.UpdateProudct(productId,productData)
        .then((res) => {
          setConfirmBox(!confrimBox)
          setProductId("")
          setProductData({
            Name: "",
            Price: "",
            Stock: "",
          });
        })
        .catch((err) => console.log(err));
      }
  };

  const handleDelete = (id) => {
      CustemerService.DeleteProudct(id).then((res) =>{
        setConfirmBox(!confrimBox)
          setProductId("")
      }).catch((err) => console.log(err));
  }

  return (
    <div className="container mt-5">
      <div className="mb-3 row">
        <label for="staticEmail" className="col-lg-2 col-form-label">
          Product Name
        </label>
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={productData.Name}
            onChange={(e) => {
              setProductData({ ...productData, Name: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="staticEmail" className="col-lg-2 col-form-label">
          Product Price
        </label>
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            placeholder="Enter product price"
            value={productData.Price}
            onChange={(e) => {
              setProductData({ ...productData, Price: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label for="staticEmail" className="col-sm-2 col-form-label">
          Total Stock
        </label>
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            placeholder="Enter product stocks"
            value={productData.Stock}
            onChange={(e) => {
              setProductData({ ...productData, Stock: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <button className="btn btn-success" onClick={handleSubmitAndEdit}>
          {productId === "" ? "Create Product" : "Update Product"}
        </button>
      </div>
      {products && products.length > 0 && (
        <>
          <h3>Product List</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stcoks</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>{item.Name}</td>
                    <td>{item.Price}</td>
                    <td>{item.Stock}</td>
                    <td>
                      <button
                        onClick={() => {
                          setProductId(item._id);
                          setProductData({
                            ...productData,
                            Name: item.Name,
                            Price:item.Price,
                            Stock:item.Stock
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>
                      <button class="ms-2"  
                      onClick={() => {
                        handleDelete(item._id)
                        }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash3-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
