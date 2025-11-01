import {  useEffect, useRef, useState } from "react";
import "./App.css";
import Display from "./Display";
import Home from "./Home";
import axios from "axios"
import Insert from "./Insert";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowSingleUserDetails from "./ShowSingleUserDetails";

function App() {
  const API = "http://localhost:9999/user";
  const [navMenus, setNavMenus] = useState([]);
  const [users,setUsers] = useState(null)
  const activeElement = useRef(null);
  const controllerSignalRef = useRef()
  

useEffect(() => {
  if (controllerSignalRef.current) return
    const controller = new AbortController();
    controllerSignalRef.current = controller.signal;
    const fetchUsers = async () => {
        try {
            // Pass the signal to the fetch request
            const response = await axios.get(`${API}/display`,{signal:controllerSignalRef.current}); 
            const data = response.data
          setUsers(data.data)
          console.log(data)
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Fetch failed:", error);
            }
        }
    };
    
    fetchUsers();

    // Cleanup function: runs when the component unmounts
    return () => {
       
    };
}, [users]);
  const setActiveMenuOption = (menuElementId) => {
    if (navMenus.length > 0) {
      activeElement.current = navMenus?.find(
        (element) => element.id === menuElementId
      );
      
      activeElement.current.classList.add("is-active");
    }
    return () => {
      
      if (!activeElement.current) return;
      
      activeElement.current.classList.remove("is-active");
    };
  };
  return (
    <>
      <Router>
        <Navbar setNavMenus={setNavMenus} API={API} users={users} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                  API={API} 
                 setActiveMenuOption={setActiveMenuOption} />
            }
          ></Route>
          <Route
            path="/display"
            element={
              <Display
                 setUsers = {setUsers}
                  users = {users}
                  API={API}
                setActiveMenuOption={setActiveMenuOption}
              />
            }
          ></Route>
          <Route
            path="/insert"
            element={
              <Insert
              setUsers = {setUsers}
              API={API}
              setActiveMenuOption={setActiveMenuOption}
              />
            }
          ></Route>
          <Route path="/display/:id" element={<ShowSingleUserDetails users={users}/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
