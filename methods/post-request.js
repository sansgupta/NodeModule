const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyparser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      req.writeHead(201, { "Content-Type": "application/json" });
      res.end();
      console.log("Request Body: ", body);
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  }
  else {
    res.write(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};
