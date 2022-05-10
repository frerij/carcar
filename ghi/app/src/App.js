import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

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
          <Route path="/api/automobiles/">
            <Route path="" element={<AutomobileList autos={props.autos} />} />
            <Route path="new" element={<AutomobileForm/>} />
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
