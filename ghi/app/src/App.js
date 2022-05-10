import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import Nav from "./Nav";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import VehicleForm from "./VehicleForm";

function App(props) {
  if (props === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/">
            <Route path="" element={<ManufacturerList />} />
            <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          </Route>
          <Route path="/api/automobiles/">
            <Route path="" element={<AutomobileList autos={props.autos} />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>

          <Route path="/api/manufacturers" element={<ManufacturerForm />} />
          <Route path="/models/new" element={<VehicleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
