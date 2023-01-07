import express from "express";
import {
  addProduct,
  getEntries,
  getEntry,
  updateRecord,
  deleteEntry,
  addProdDetails,
  allProdEntries,
  getADayEntries,
} from "../controller/productController.js";
const router = express.Router();
router.post("/addProduct", addProduct);
console.log("in Routes file");
router.get("/all/:startDate/:endDate", getEntries);

router.get("/allADayEntries/:selectedDate", getADayEntries);

router.get("/allProdEntries", allProdEntries);

router.get("/:id", getEntry);
router.post("/updateProd", updateRecord);

router.delete("/delete/:id", deleteEntry);

router.post("/addProdDetails", addProdDetails);

export default router;
