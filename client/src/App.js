//import logo from './logo.svg';
import "./App.css";

import AddProd from "./components/AddProd";
import AllEntries from "./components/AllEntries";
import GurukrupaDairy from "./components/GurukrupaDairy";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProd from "./components/EditProd";
import AddProdDetails from "./components/AddProdDetails";

import Report from "./components/Report";

import DeleteProd from "./components/DeleteProd";
// import BasicDatePicker from "./BasicDatePicker";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<GurukrupaDairy />}></Route>
          <Route path="/addProduct" element={<AddProd />}></Route>
          <Route path="/allProduct" element={<AllEntries />}></Route>
          <Route path="/editProduct/:id" element={<EditProd />}></Route>
          <Route path="/deleteProduct/:id" element={<DeleteProd />}></Route>
          <Route path="/addProdDetails" element={<AddProdDetails />}></Route>
          <Route path="/report" element={<Report />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    // <BasicDatePicker dateVal="01/01/2011" />
  );
}

export default App;
