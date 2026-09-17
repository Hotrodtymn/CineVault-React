import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Nav />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/movie/:id"
            element={<Movie />}
          />

          <Route
            path="/watchlist"
            element={<Watchlist />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;