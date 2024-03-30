const socket = io();
const form = $("#form");
const messages = $("#messages");
const statusContainer = $("#statusContainer");

socket.on("connect", () => {
  statusContainer.addClass("invisible");

  socket.on("disconnect", () => {
    statusContainer.removeClass("invisible");
  });
  form.on("submit", (e) => {
    e.preventDefault();

    const message = $("#textField").val();
    if (message === "") {
      return false;
    }
    const date = new Date();
    socket.emit("sendMessage", {
      message: message,
      timestamp: `${date.getHours()}:${date.getMinutes()}`,
      id: socket.id,
    });
    $("#textField").val("");
    return false;
  });

  socket.on("renderMessage", (data) => {
    const messageType =
      data.id === socket.id ? "user-message" : "received-message";

    messages.append(
      `<div class="${messageType} m-md-3 m-2 p-md-2 p-1">
                <h5>${data.message}</h5>
                <p>${data.timestamp}</p>
              </div>`
    );
  });
});
