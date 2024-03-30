const serverData = {
  port: 3000,
  hostname: "127.0.0.1",
};
const routes = {
  authentication: "/",
  home: "/chat",
};
const views = {
  home: "home",
  authentication: "authentication",
  notFound: "404",
};

const firebaseConfig = {
  apiKey: "AIzaSyAYGitenpV2SCMQJZoaNn1gKmN9HHzcxRw",
  authDomain: "chat-app-14212.firebaseapp.com",
  projectId: "chat-app-14212",
  storageBucket: "chat-app-14212.appspot.com",
  messagingSenderId: "956855459513",
  appId: "1:956855459513:web:919dfa40d1cc8f8b77c568",
  measurementId: "G-E228GR5QZM",
};

module.exports = { serverData, routes, views, firebaseConfig };
