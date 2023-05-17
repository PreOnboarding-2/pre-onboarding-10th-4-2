import App from "./App";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { TodoProvider } from "./application/TodoProvider";
import { TodoSuggestProvider } from "./application/TodoSuggestProvider";

ReactDOM.render(
  <StrictMode>
    <TodoProvider>
      <TodoSuggestProvider>
        <App />
      </TodoSuggestProvider>
    </TodoProvider>
  </StrictMode>,
  document.getElementById("root")
);
