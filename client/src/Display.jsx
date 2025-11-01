import React, { useEffect, useState } from 'react'
import "./Display.css" // Import the styles
import axios from "axios"
import UserTableList from './UserTableList'
import UpdateUserForm from './UpdateUserForm'
// Receive the 'users' state as a prop
function Display({API,setUsers, users, setActiveMenuOption }) {
    
    const [selectedUser,setSelectedUser] =useState(null)
    const displayMenu = "display-nav-item" 
const deleteHandler = async (user_id) =>{
    const res = await axios.delete(`${API}/delete/${user_id}`)
    console.log(res.data)
     const allUsers = await axios.get(`${API}/display`); 
          
          setUsers(allUsers.data.data)
    
}
    // Menu highlighting logic (as provided)
    useEffect(()=>{
        const cleanUpFunction = setActiveMenuOption(displayMenu);
        // Note: Added dependency array for best practice
        return cleanUpFunction
    }, [setActiveMenuOption]); 

    // 1. LOADING STATE: users is null (initial value)
    if (users === null) {
        return (
            <div className="display-container status-container">
                <div className="loader"></div> {/* CSS-driven loader */}
                <h2>Loading user data...</h2>
            </div>
        );
    }

    // 2. NO USERS STATE: users is an array, but its length is 0
    if (users.length === 0) {
        return (
            <div className="display-container status-container">
                <h2>No Users Available 🙁</h2>
                <p>Please use the Insert page to add new user data.</p>
            </div>
        );
    }
    if(selectedUser) return <UpdateUserForm setUsers={setUsers} API={API} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
    // 3. DATA TABLE STATE: users is an array with items
    return <UserTableList users ={users} deleteHandler ={deleteHandler}  setSelectedUser={setSelectedUser}/>
}

export default Display;