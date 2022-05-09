import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
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
          <Route path="/api/automobiles/" element={<AutomobileList autos={props.autos} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
