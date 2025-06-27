const path = require("path");
const chalk = require("chalk");
const Note = require("./models/Note");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  await Note.create({ title });
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNote(id) {
  await Note.deleteOne({ _id: id });
  console.log(chalk.bgGreen(`Note w/ id=${id} has been removed!`));
}

async function editNote(data) {
  const { id, title } = data;
  await Note.updateOne({ _id: id }, { title });
  console.log(chalk.bgGreen(`Note w/ id=${id} has been edited!`));
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  editNote,
};
