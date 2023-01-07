// import product from "../schema/product-schema.js";
import Product from "../schema/product-schema.js";
import ProductDetails from "../schema/prodDetail-schema.js";
import { response } from "express";
//import { moment } from "moment";
export const addProduct = async (req, resp) => {
  const product = req.body;

  const newEntry = new Product(product);

  try {
    await newEntry.save();
    resp.status(201).json(newEntry);
  } catch (error) {
    console.log(error);
  }
};

export const addProdDetails = async (req, resp) => {
  const productDetails = req.body;

  const newEntry = new ProductDetails(productDetails);

  try {
    const result = await newEntry.save();
    console.log(result);
    resp.status(201).json(newEntry);
  } catch (error) {
    console.log(error);
  }
};

export const getEntries = async (req, resp) => {
  try {
    console.log(
      "==GetEntries from productController===>",
      req.params.startDate,
      req.params.endDate
    );

    const allPEntries = await Product.find({
      date: {
        $gte: new Date(req.params.startDate).toISOString(),
        $lte: new Date(req.params.endDate).toISOString(),
      },
    });
    console.log("==allPEntries===", allPEntries);
    resp.status(200).json(allPEntries);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

export const getADayEntries = async (req, resp) => {
  try {
    //console.log("getADayEntries==>>", req.params.selectedDate);

    const dateFinal = new Date(Number(req.params.selectedDate));
    const number = Number(req.params.selectedDate);

    let valStore =
      ((dateFinal.getTimezoneOffset() * 60000) + Number(req.params.selectedDate));
    console.log(valStore);

    console.log("====>", new Date(valStore).toDateString());

    console.log((valStore - number) / 60000 / 60);
    //  console.log("dateFinal", moment(dateFinal), date);
    const result = await Product.find({
      date: dateFinal,
    });
    console.log("result", result);
    resp.status(200).json(result);
  } catch (error) {
    console.log("getADayEntries:::::prod controller::::::::::::::", error);
  }
};

export const allProdEntries = async (req, resp) => {
  try {
    const allPEntries = await ProductDetails.find();
    resp.status(200).json(allPEntries);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

export const getEntry = async (req, resp) => {
  try {
    //console.log("getEntry...Controller");
    const pEntry = await Product.find({ _id: req.params.id });
    resp.status(200).json(pEntry);
  } catch (error) {
    resp.status(404).json({ message: error.message });
  }
};

export const updateRecord = async (req, resp) => {
  const product = req.body;

  //console.log("updateRecord::::" + product.id);
  // const newEntry = new Product(product);
  var myquery = { _id: product.id };
  var newvalues = {
    $set: {
      date: product.date,
      productName: product.productName,
      quantity: product.quantity,
    },
  };
  try {
    await Product.updateOne(myquery, newvalues);
    resp.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEntry = async (req, resp) => {
  var myquery = { _id: req.params.id };
  console.log("myquery" + myquery);
  try {
    const pEntry = await Product.deleteOne(myquery);
    resp.status(200).json(pEntry);
  } catch (error) {
    console.log(error);
  }
};
