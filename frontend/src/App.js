import "./App.css";
import React from "react";
import { useRoutes } from "hookrouter";
import Login from './login/login'
import Register from './register/register'
import GitSearch from './gitSearch/git-search'

const routes = {
  "/": () => <Login />,
  "/register": () => <Register />,
  "/git-search": () => <GitSearch />,
};

function App() {
  return useRoutes(routes);
}

export default App;
