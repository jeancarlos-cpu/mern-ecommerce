import mongoose from "mongoose";

const { String, Number } = mongoose.Schema.Types;

const Product = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sku: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

export default mongoose.models.Product
  ? mongoose.models.Product
  : mongoose.model("Product", Product);
