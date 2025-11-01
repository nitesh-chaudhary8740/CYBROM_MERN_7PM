import React, { useEffect, useRef, useState, } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
// import axios from "axios"
import SearchResults from './SearchResults'

function Navbar({setNavMenus,users}) {
  const [searchResults,setSearchResults] = useState([]) //array of all searchResults (returned match queries docs)
  const timeOutRef = useRef(null)
  const searchBoxRef = useRef(null)
  const [searchBoxInput ,setSearchBoxInput] = useState("")
  const handleOncsearch = async(event)=>{
    const query = event.target.value;
    setSearchBoxInput(query);
    if(!users || !query) {
      setSearchResults([])
      return;
    };
    if (timeOutRef.current) clearTimeout(timeOutRef.current)

   timeOutRef.current =  setTimeout(() => {
      // const response = axios.get(`${API}/search/${event.target.value}`)
      const tempArray =users.filter((user)=>
      user.userName.toLowerCase().includes(query)|| 
      user.fullName.toLowerCase().includes(query)||
      user.courseName.toLowerCase().includes(query)

      )
      setSearchResults([...tempArray])
    console.log("seach",searchResults)
    }, 500);
  
  }
  const showSearchBox = searchBoxInput.length>0
useEffect(()=>{
    setNavMenus([...document.querySelectorAll('.nav-items')])
    },[])
  return (
    <nav className='nav-container'>
        <nav className="left-nav">
            <span id='home-nav-item' className='nav-items'><Link to={"/"}>Home</Link></span>
            <span id='insert-nav-item' className='nav-items'><Link to={"/insert"}>Insert</Link></span>
            <span id='display-nav-item' className='nav-items'><Link to={"display"}>Display</Link></span>
        </nav>
        <nav className="right-nav">
            <input ref={searchBoxRef.current} value={searchBoxInput} type="search" name="search"  id="search" onChange={handleOncsearch} />
            <button>search</button>
        </nav>
      { showSearchBox>0 && <SearchResults searchResults = {searchResults} />}
      {/* if any character is typed on seach input box searchResult component will render */}
    </nav>
  )
}

export default Navbar
