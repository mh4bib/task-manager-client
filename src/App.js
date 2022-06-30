import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ToDo from './components/ToDo';
import CompletedTasks from './components/CompletedTasks';
import Calendar from './components/Calendar';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/to-do' element={<ToDo></ToDo>}></Route>
        <Route path='/completed-tasks' element={<CompletedTasks></CompletedTasks>}></Route>
        <Route path='/calendar' element={<Calendar></Calendar>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
