const mongoose = require("mongoose");
const validator = require("validator");

const EmployeeSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
