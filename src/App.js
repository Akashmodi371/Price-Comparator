import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Amazon from './Components/Amazon';
import Front from './Components/Front';
import Flipkart from './Components/Flipkart';
 import Prices from './Components/Prices';
function App() {
  return (
     <Router>
        <Routes>
          <Route path='/' Component={Front}/>
          <Route path='/Amazon' Component={Amazon}/>
          <Route path='/Flipkart' Component={Flipkart}/>
          <Route path='/Prices/:productID' Component={Prices}/>
        </Routes>
     </Router>
  );
}

export default App;
