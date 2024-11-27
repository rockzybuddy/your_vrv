const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // Removed enum constraint
  status: { type: String, enum: ["active", "inactive"], default: "active" }, // Kept enum for status
});

// Create and export the model
const User = mongoose.model("User", userSchema);

module.exports = User;
