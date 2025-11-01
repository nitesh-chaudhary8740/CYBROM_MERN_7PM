import React, { useEffect, useState } from "react";
import "./Insert.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Insert({ setUsers,setActiveMenuOption,API }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName: "",
        fullName: "",
        courseName: "", 
        duration: "",
        contact: ""
    });
const handleOnSubmit = async(e)=>{
    try {
        e.preventDefault();
        const response =await axios.post(`${API}/insert`,formData);
        console.log(response.data)
    const allUsers = await axios.get(`${API}/display`); 
          
          setUsers(allUsers.data.data)
        
        setFormData({
        userName: "",
        fullName: "",
        courseName: "", 
        duration: "",
        contact: ""
    })
    navigate("/display")

    } catch (error) {
        console.log(error)
    }

}
    const formInputOnchangeHandler = (event) => {
        const { name, value } = event.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    
    const insertMenu = "insert-nav-item"
    // This useEffect handles your manual active class management
    useEffect(() => {
        const cleanUpFunction = setActiveMenuOption(insertMenu);
        return cleanUpFunction
    }, [setActiveMenuOption]);

    return (
        <div className="insert-container">
            <form onSubmit={handleOnSubmit} className="insert-form">
                
                <label htmlFor="user-name">Username</label>
                <input 
                    type="text" 
                    id="user-name" 
                    name="userName" 
                    value={formData.userName}
                    onChange={formInputOnchangeHandler}
                    required // <--- ADDED REQUIRED
                />
                
                <label htmlFor="full-name">Full Name</label>
                <input 
                    type="text" 
                    id="full-name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={formInputOnchangeHandler}
                    required // <--- ADDED REQUIRED
                />
                
                <label htmlFor="course-name">Course Name</label>
                <select 
                    name="courseName" 
                    id="course-name"
                    value={formData.courseName}
                    onChange={formInputOnchangeHandler}
                    required // <--- ADDED REQUIRED
                >
                    {/* The first option must have value="" for 'required' to work on select */}
                    <option value="">Select Course</option>
                    <option value="mern fsd">MERN FSD</option>
                    <option value="java fsd">JAVA FSD</option>
                    <option value="python fsd">PYTHON FSD</option>
                    <option value="da/ds">DA/DS</option>
                    <option value="digital marketing">DIGITAL MARKETING</option>
                </select>
                
                <label htmlFor="duration">Duration</label>
                <select 
                    name="duration" 
                    id="duration"
                    value={formData.duration}
                    onChange={formInputOnchangeHandler}
                    required // <--- ADDED REQUIRED
                >
                    {/* The first option must have value="" for 'required' to work on select */}
                    <option value="">Select Duration</option>
                    <option value="5+1 months">5+1 months</option>
                    <option value="7+1 months">7+1 months</option>
                    <option value="1 year">1 year</option>
                </select>
                
                <label htmlFor="contact">Contact</label>
                <input 
                    type="number" 
                    id="contact" 
                    name="contact"
                    value={formData.contact}
                    onChange={formInputOnchangeHandler}
                    required // <--- ADDED REQUIRED
                />
                
                <button type="submit">Submit Data</button>
            </form>
        </div>
    );
}

export default Insert;