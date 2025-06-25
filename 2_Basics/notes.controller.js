const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("List of notes:"));
  console.log(chalk.blue(`|      id       | title |`));
  notes.forEach((note) => {
    console.log(chalk.blue(`| ${note.id} | ${note.title} |`));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  if (JSON.stringify(filteredNotes) !== JSON.stringify(notes)) {
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.bgGreen(`Note w/ id=${id} has been removed!`));
  } else console.log(chalk.yellow(`There is no one Note w/ id=${id}`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
