const express = require("express");
const path = require("path");
const { serverData, views, routes } = require("./src/js/utils");
const app = express();
const { Server } = require("socket.io");

//*------------------------------------------
//*----------------App settings--------------
//*------------------------------------------
//Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
//Static file
app.use(express.static(path.join(__dirname, "src")));

//-------------------------------------------
//-----------------End App settings---------
//-------------------------------------------

//*------------------------------------------
//*----------------Routes--------------------
//*------------------------------------------
app.get(routes.home, (req, res) => {
  res.status(200).render(views.home);
});

app.all("*", (req, res) => {
  res.status(404).render(views.notFound);
});
//-------------------------------------------
//-----------------End Routes----------------
//-------------------------------------------

const server = app.listen(serverData.port, serverData.hostname, () =>
  console.log(`Listenting at: http://${serverData.hostname}:${serverData.port}`)
);

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("renderMessage", data);
  });
});
