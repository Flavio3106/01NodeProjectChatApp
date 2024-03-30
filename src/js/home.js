const socket = io();
const form = $("#form");
const messages = $("#messages");
const statusContainer = $("#statusContainer");

const urlParams = new URLSearchParams(location.search);

function renderMessage(messageData) {
  messages.append(
    `<div class="${messageData.messageType} m-md-3 m-2 p-md-2 p-1">
              <h5>${messageData.message}</h5>
              <p>${messageData.timestamp}</p>
            </div>`
  );
}

socket.on("connect", () => {
  statusContainer.addClass("invisible");
  const uid = urlParams.get("uid");

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
      uid: uid,
    });
    $("#textField").val("");
    return false;
  });

  socket.on("renderMessage", (data) => {
    const messageType = data.uid === uid ? "user-message" : "received-message";
    renderMessage({
      messageType: messageType,
      message: data.message,
      timestamp: data.timestamp,
    });
  });
});
