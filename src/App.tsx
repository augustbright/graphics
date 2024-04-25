import { css } from "@emotion/css";
import "./App.css";
import { Scene } from "./components/Scene";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
        height: 100vh;
      `}
    >
      <Sidebar />
      <Scene />
    </div>
  );
}

export default App;
