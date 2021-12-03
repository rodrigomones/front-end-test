import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import "./App.scss";
import { CharacterProvider } from "./context/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ItemDetailContainer } from "./containers/ItemDetailContainer";
import { ItemListContainer } from "./containers/ItemListContainer";
import { About } from "./components/About/About";

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <NavBar />

          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route
              exact
              path="/character/:id"
              element={<ItemDetailContainer />}
            />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </CharacterProvider>
  );
}

export default App;
