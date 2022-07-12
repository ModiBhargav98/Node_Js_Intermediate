import axios from "axios";

const PRODUCT_URL = "http://localhost:4001/product/";
const LOGIN_URL = "http://localhost:4001/google/";

class CustomerService {
  getAllProudct() {
    return axios.get(PRODUCT_URL
    // {
    //   headers: {
    //     token: token,
    //   },
    // }
    );
  }
  CreateProudct(data) {
    return axios.post(PRODUCT_URL + "create",data);
  }
  UpdateProudct(productId,data) {
    return axios.put(PRODUCT_URL + productId,data);
  }
  DeleteProudct(productId) {
    return axios.delete(PRODUCT_URL + productId);
  }
  LoginAndSignup() {
    console.log("gfhgfgh")
    return axios.get(LOGIN_URL);
  }
}
export default new CustomerService();
