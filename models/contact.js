import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  telefon: {
    type: String,
  },
  email: {
    type: String,
  },
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Contact", contactSchema);
