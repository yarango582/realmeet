import { AppRouter } from "./router/Router";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <main className="app-content">
        <header className="app-header">
          <h1>Realmeet</h1>
        </header>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
