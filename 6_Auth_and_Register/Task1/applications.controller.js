const chalk = require("chalk");
const Application = require("./models/Application");

async function addApplication(fio, phone, problem) {
  await Application.create({ fio, phone, problem });
  console.log(chalk.bgGreen("Application was added!"));
}

async function getApplications() {
  const Applications = await Application.find();
  return Applications;
}

module.exports = {
  addApplication,
  getApplications,
};
