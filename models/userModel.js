const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
{
  username: { type: String, required: [true, "Username is required"], unique: true, minLength: [6, "minimum length should be 6 characters"] },
  password: { type: String, required: true }
},
{
  timestamps: true, // Add createdAt and updatedAt fields
});


module.exports = mongoose.model("user", UserSchema) // users