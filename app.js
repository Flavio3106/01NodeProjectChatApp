const express = require("express");
const path = require("path");
const { serverData, views, routes, firebaseConfig } = require("./utils");
const app = express();
const { Server } = require("socket.io");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} = require("firebase/auth");
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
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

//route "/"
app.get(routes.authentication, (req, res) => {
  logout();
  res.status(200).render(views.authentication);
});

//route: "/chat"
app.get(routes.home, (req, res) => {
  if (firebaseAuth.currentUser !== null) {
    res.status(200).render(views.home);
  } else {
    res.status(403).render(views.notFound);
  }
});

//when the route is not found
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

//*Socket connection
io.on("connection", (socket) => {
  //when a message is send to the server
  socket.on("sendMessage", (data) => {
    //render it
    io.emit("renderMessage", data);
  });
  socket.on("signinUser", (userData) => signinUser(userData));
  socket.on("loginUser", (userData) => loginUser(userData));
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      socket.emit("authResponse", { state: true, uid: user.uid });
    } else {
      socket.emit("authResponse", { state: false, uid: undefined });
    }
  });
});

//-------------------------------------------
//*------Authentication Settings-------------
//-------------------------------------------

//login the user using an email and a password
//userData, object {password,email}
function loginUser({ email, password }) {
  signInWithEmailAndPassword(firebaseAuth, email, password).catch((err) => {
    console.log(err.code);
  });
}

//signin the user using an email and a password
//userData, object {password,email}
function signinUser({ email, password }, socket) {
  createUserWithEmailAndPassword(firebaseAuth, email, password).catch((err) => {
    console.log(err.code);
  });
}

//logout the user
function logout() {
  firebaseAuth.signOut();
}
