import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home({ setActiveMenuOption }) {
    const navigate = useNavigate()
  const homeMenu = "home-nav-item"; //id of the  home menu
  //effect to change nav active nav menu
  useEffect(() => {
    const cleanUpFunction = setActiveMenuOption(homeMenu);
    return cleanUpFunction;
  });

  return (
    <div className="home-container">
      <h2>Welcome to Homepage!</h2>
      <div className="home-options">
        <button onClick={()=>{
            navigate("/insert")
        }}>Insert Data</button>
        <button onClick={()=>{
            navigate("/display")
        }}>Display Data</button>
      </div>
    </div>
  );
}

export default Home;
