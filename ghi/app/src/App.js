import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import ManufacturerForm from "./ManufacturerForm";
import Nav from "./Nav";
import AutomobileList from "./AutomobileList";
import ManufacturerList from "./ManufacturerList";

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route
            path="/api/automobiles/"
            element={<AutomobileList autos={props.autos} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
