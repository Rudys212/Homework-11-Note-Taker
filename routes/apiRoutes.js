// require db json???
const fs = require("fs");
// const data = "db/db.json";
const util = require("util");
const fsAsync = util.promisify(fs.readFile);

module.exports = (app) => {
  // API GET Requests

  app.get("/api/notes", (req, res) => {
    fsAsync("db/db.json", "utf8").then((notesData) => {
      console.log(typeof notesData);
      res.json(JSON.parse(notesData));
    });
  });

  // API POST requests
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    fsAsync("db/db.json", "utf8");
  });

  // DELETE route

  //   app.post("/api/notes/:id", (req, res) => {
  // Empty out the arrays of data
  //     data.length = 0;

  //     res.json({ ok: true });
  //   });
};
