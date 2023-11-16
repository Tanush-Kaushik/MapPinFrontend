import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import './App.css';
import LiveMap from './components/LiveMap';
import Navbar from './components/Navbar'
import Register from './screens/Register';
import Login from './screens/Login'

function App() {

  return (
    // <div className="App">

    //   <div><Navbar/></div>
    //   <div><LiveMap/></div>

    //   <div>hello</div>
    // </div>

    <Router>
      <Routes>
      <Route exact path='/' element={<LiveMap/>} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
