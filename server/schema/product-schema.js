import mongoose from "mongoose";
import autoIncreament from "mongoose-auto-increment";
const productSchema = mongoose.Schema({
  prodId: String,
  date: Date,
  productName: String,
  quantity: String,
});

autoIncreament.initialize(mongoose.connection);
productSchema.plugin(autoIncreament.plugin, "products");
const product = mongoose.model("products", productSchema);

export default product;
