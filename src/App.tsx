import cn from "classnames";
import { css } from "@emotion/css";
import "./App.css";
import { Scene } from "./components/Scene";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div
      className={cn(
        css`
          display: flex;
          flex-direction: row;
          height: 100vh;
        `,
        "bg-background dark"
      )}
    >
      <Sidebar />
      <Scene />
    </div>
  );
}

export default App;
