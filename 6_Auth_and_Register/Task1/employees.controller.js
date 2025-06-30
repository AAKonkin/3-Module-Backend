const Employee = require("./models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./constants");

async function addEmployee(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  await Employee.create({ email, password: passwordHash });
}

async function loginEmployee(email, password) {
  const employee = await Employee.findOne({ email });

  if (!employee) {
    throw new Error("Employee is not found");
  }
  const isPasswordCorrect = await bcrypt.compare(password, employee.password);

  if (!isPasswordCorrect) {
    throw new Error("Wrong password ");
  }

  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = { addEmployee, loginEmployee };
