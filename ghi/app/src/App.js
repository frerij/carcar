import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import Nav from './Nav';
import AutomobileList from './AutomobileList';

function App(props) {
  if (props.autos === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
<<<<<<< HEAD
          <Route path="/api/manufacturers" element={<ManufacturerForm />} />
=======
          <Route path="/api/automobiles/" element={<AutomobileList autos={props.autos} />} />
>>>>>>> 44016f040b94176021c5b2acf56b88c978627069
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
