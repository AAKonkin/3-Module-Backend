const path = require("path");
const chalk = require("chalk");
const Note = require("./models/Note");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title, owner) {
  await Note.create({ title, owner });
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function removeNote(id, owner) {
  const result = await Note.deleteOne({ _id: id, owner });
  if (result.matchedCount === 0) {
    throw new Error("No note to remove");
  }
  console.log(chalk.bgGreen(`Note w/ id=${id} has been removed!`));
}

async function updateNote(data, owner) {
  const { id, title } = data;
  const result = await Note.updateOne({ _id: id, owner }, { title });
  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }
  console.log(chalk.bgGreen(`Note w/ id=${id} has been edited!`));
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  updateNote,
};
