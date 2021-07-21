const fs = require("fs");
const util = require("util");
const fsAsync = util.promisify(fs.readFile);
const writeFsAsync = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  // API GET Requests

  app.get("/api/notes", (req, res) => {
    fsAsync("./db/db.json", "utf8").then((notesData) => {
      const dataNotes = JSON.parse(notesData);
      res.json(dataNotes);
    });
  });

  // API POST requests
  app.post("/api/notes", (req, res) => {
    let notesEntered = req.body;
    fsAsync("./db/db.json", "utf8")
      .then((data) => {
        const entryData = JSON.parse(data);
        notesEntered["id"] = uuidv4();
        entryData.push(notesEntered);
        writeFsAsync("./db/db.json", JSON.stringify(entryData))
          .then((data) => {
            res.json(notesEntered);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  // DELETE route

  // app.delete("/api/notes/:id", (req, res) => {
  //   const deleteNotes = deleteId(req.params.id);
  //   if (deleteNotes === -1) return res.status(404).json({});
  //   notes.splice(deleteNotes, 1);
  //   res.JSON(notes);
  // });
};
