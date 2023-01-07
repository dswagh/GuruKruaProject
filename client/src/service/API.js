import axios from "axios";

const URL = "http://localhost:8000";
export const addProduct = async (data) => {
  try {
    return await axios.post(`${URL}/addProduct`, data);
  } catch (error) {
    console.log(error);
  }
};

export const addProdDetails = async (data) => {
  try {
    return await axios.post(`${URL}/addProdDetails`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getEntries = async (date) => {
  try {
    console.log("=====getEntries(API)======>", date[0], date[1]);
    return await axios.get(`${URL}/all/${date[0]}/${date[1]}`);
    //  ${date[0]}&endDate=${date[1]}
  } catch (error) {
    console.log("error from getEntries-API" + error);
  }
};

export const getADayEntriesAPI = async (date) => {
  try {
    // var toMillisDate = Date.parse(date);
    console.log("getADayEntry:::::::::::::::::::::::::", new Date(date));
    return await axios.get(`${URL}/allADayEntries/${date}`);
    //  ${date[0]}&endDate=${date[1]}
  } catch (error) {
    console.log("error from getEntries-API" + error);
  }
};

export const getAllProdEntries = async () => {
  try {
    return await axios.get(`${URL}/allProdEntries`);
  } catch (error) {
    console.log("error from getEntries-API" + error);
  }
};

export const getProductDetails = async (id) => {
  try {
    return await axios.get(`${URL}/${id}`);
  } catch (error) {
    console.log("Error while calling API-getProductDetails" + error);
  }
};

export const updateProd = async (data) => {
  try {
    return await axios.post(`${URL}/updateProd`, data);
  } catch (error) {
    console.log(error);
  }
};
export const deleteRecordAPI = async (id) => {
  try {
    return await axios.delete(`${URL}/delete/${id}`);
  } catch (error) {
    console.log(error);
  }
};
