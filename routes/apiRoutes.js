// require db json???
const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
const util = require("util");
const fsAsync = util.promisify(fs.readFile);
// const nodeid = require("node-id");
const writeFsAsync = util.promisify(fs.writeFile);

module.exports = (app) => {
  // API GET Requests

  app.get("/api/notes", (req, res) => {
    fsAsync("./db/db.json", "utf8").then((notesData) => {
      console.log(typeof notesData);
      res.json(JSON.parse(notesData));
    });
  });

  // API POST requests
  app.post("/api/notes", (req, res) => {
    let notesEntered = req.body;

    fsAsync("./db/db.json", (err, data) => {
      if (err) throw err;
      entryData = JSON.parse(data);
      entryData.push({ notesEntered });
      let entryIdNumber = 1;
      entryIdNumber.forEach((note, index) => {
        note.id = entryIdNumber;
        entryIdNumber++;
        return entryData;
      });
      console.log(entryData);

      dataString = JSON.stringify(entryData);
      writeFsAsync("./db/db.json", dataString, (err, data) => {
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
