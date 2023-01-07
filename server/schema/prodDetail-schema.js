import mongoose from "mongoose";
import autoIncreament from "mongoose-auto-increment";

autoIncreament.initialize(mongoose.connection);
const prodDetailSchema = mongoose.Schema({
  prodId: String,
  productName: String,
  productCat: String,
  prodManfact: String,
  prodPurPrice: String,
  prodSellPrice: String,
});

prodDetailSchema.plugin(autoIncreament.plugin, "prodDetails");
const productDetails = mongoose.model("prodDetails", prodDetailSchema);
export default productDetails;
