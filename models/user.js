import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactList: [
    {
      contactId: {
        type: Schema.ObjectId,
        ref: "Contact",
      },
    },
  ],
});

export default mongoose.model("User", userSchema);
