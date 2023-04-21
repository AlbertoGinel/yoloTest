import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { FirebaseProvider } from "./providers/FirebaseProvider";
import Users from "./routes/Users";
import User from "./routes/User";
import Games from "./routes/Games";
import Game from "./routes/Game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="user/:userId" element={<User />} />
          <Route path="/games" element={<Games />} />
          <Route path="game/:gameId" element={<Game />} />
        </Routes>
      </BrowserRouter>
  </FirebaseProvider>
);
