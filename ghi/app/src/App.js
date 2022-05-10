import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import Nav from "./Nav";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";

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
          <Route path="manufacturers/">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles/">
            <Route path="" element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
