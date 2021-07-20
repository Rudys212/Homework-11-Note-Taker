// require db json???
const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
const util = require("util");
const fsAsync = util.promisify(fs.readFile);
// const nodeid = require("node-id");
const writeFsAsync = util.promisify(fs.writeFile);
const uuidv1 = require("uuid");

module.exports = (app) => {
  // API GET Requests

  app.get("/api/notes", (req, res) => {
    fsAsync("./db/db.json", "utf8").then((notesData) => {
      // console.log(typeof notesData);
      // console.log(JSON.parse(notesData));
      const dataNotes = JSON.parse(notesData);
      // console.log(dataNotes.data);
      res.json(dataNotes);
    });
  });

  // API POST requests
  app.post("/api/notes", (req, res) => {
    let notesEntered = req.body;
    let entryData = "";
    fsAsync("./db/db.json", (err, data) => {
      if (err) throw err;
      entryData = JSON.parse(data);
      notesEntered[id] = uuidv1();
      entryData.push(data);
      // let dataString = JSON.stringify(entryData);
      writeFsAsync("./db/db.json", JSON.stringify("entryData"), (err, data) => {
        if (err) throw err;
      });
    });
    res.send("Notes is saved");
  });
  // DELETE route

  app.delete("/api/notes/:id", (req, res) => {
    const deleteNotes = deleteId(req.params.id);

    if (deleteNotes === -1) return res.status(404).json({});
    notes.splice(deleteNotes, 1);
    res.JSON(notes);
  });
};
