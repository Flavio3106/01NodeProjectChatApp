const socket = io();
const formLogin = $("#formLogin");
const formSignin = $("#formSignin");

//When the socket is connected to the server
socket.on("connect", () => {
  //Login form on submit event
  formLogin.on("submit", async (e) => {
    e.preventDefault();
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
    socket.emit("loginUser", { email, password });
  });
  //Signin form on submit event
  formSignin.on("submit", async (e) => {
    e.preventDefault();
    const email = $("#signinEmail").val();
    const password = $("#signinPassword").val();
    socket.emit("signinUser", { email, password });
  });
});

socket.on("authResponse", ({ state, uid }) => {
  if (state === true) {
    location.href = `/chat?uid=${uid}`;
  }
});
