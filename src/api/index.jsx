import axios from "axios";

export const baseURL = "http://localhost:1988";
export const api = axios.create({
  baseURL: `${baseURL}/api`,
});

const callApi = (endpoint) => {
  return {
    //get
    getItems() {
      return api
        .get(endpoint)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err));
    },
    // GET ITEM
    getItem() {
      return api
        .get(endpoint)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err));
    },
    //post
    createItem(data) {
      return api
        .post(endpoint, data)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err));
    },
    //avatar
    createImage(data) {
      console.log("createImage");
      console.log(data);
      return api
        .post(endpoint, data)
        .then((res) =>{
          console.log(res,444444444444444); 
          Promise.resolve(res.data)
        })
        .catch((err) => Promise.reject(err));
    },
    //put
    updateItem(data) {
      return api
        .put(endpoint, data)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err));
    },
    //delete
    deleteItem() {
      return api
        .delete(endpoint)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err));
    },
  };
};

export default callApi;
