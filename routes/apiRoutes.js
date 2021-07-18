// require db json???
const fs = require("fs");
// const data = "db/db.json";
const util = require("util");
const fsAsync = util.promisify(fs.readFile);

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
    let notesId = data.length.toString();
    console.log(notesEntered);
    fs.writeFileSync("./db/db.json", JSON.stringify(data), (err, data) => {
      if (err) throw err;
    });
  });
  res.send("Notes is now posted");

  // DELETE route

  app.delete("/api/notes/:id", (req, res) => {
    const deleteNotes = deleteId(req.params.id);

    if (deleteNotes === -1) return res.status(404).json({});
    notes.splice(deleteNotes, 1);
    res.JSON(notes);
  });
};
