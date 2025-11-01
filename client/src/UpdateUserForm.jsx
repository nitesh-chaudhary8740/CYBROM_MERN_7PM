import React, { useState } from "react";
import axios from "axios"
import "./UpdateUserForm.css"

function UpdateUserForm({API,setUsers, selectedUser,setSelectedUser}) {
    
    // Initialize form state with data of the user being edited
    const [formData, setFormData] = useState( {
        userName:selectedUser.userName,
        fullName:selectedUser.fullName,
        courseName:selectedUser.courseName,
        duration:selectedUser.duration,
        contact:selectedUser.contact
    });

    // Ensures the form data is reset/updated if a different user is selected for editing
   

    const updateFormCancelHandler = () =>{
        console.log("it cliked")
        setSelectedUser(null)
    }
    const updateUserData = async(e) =>{
        e.preventDefault();
        const response = await axios.patch(`${API}/update/${selectedUser._id}`,formData);
        console.log(response.data.data)
        const allUsers = await axios.get(`${API}/display`); 
        setUsers(allUsers.data.data)
        setSelectedUser(null)
    }
    

    const formInputOnchangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    return (
        <>
            
        
            <div className="modal-backdrop" >
                {/* Stop click events on the form itself from closing the modal */}
                <div className="update-form-modal" onClick={(e) => e.stopPropagation()}>
                    <h2 className="form-title">Edit User Details</h2>
                    <form className="update-form" onSubmit={updateUserData}>
                        
                        <label htmlFor="user-name-update">Username</label>
                        <input 
                            type="text" 
                            id="user-name-update" 
                            name="userName" 
                            value={formData.userName}
                            onChange={formInputOnchangeHandler}
                            required
                        />
                        
                        <label htmlFor="full-name-update">Full Name</label>
                        <input 
                            type="text" 
                            id="full-name-update" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={formInputOnchangeHandler}
                            required
                        />
                        
                        <label htmlFor="course-name-update">Course Name</label>
                        <select 
                            name="courseName" 
                            id="course-name-update"
                            value={formData.courseName}
                            onChange={formInputOnchangeHandler}
                            required
                        >
                            <option value="">Select Course</option>
                            <option value="mern fsd">MERN FSD</option>
                            <option value="java fsd">JAVA FSD</option>
                            <option value="python fsd">PYTHON FSD</option>
                            <option value="da/ds">DA/DS</option>
                            <option value="digital marketing">DIGITAL MARKETING</option>
                        </select>
                        
                        <label htmlFor="duration-update">Duration</label>
                        <select 
                            name="duration" 
                            id="duration-update"
                            value={formData.duration}
                            onChange={formInputOnchangeHandler}
                            required
                        >
                            <option value="">Select Duration</option>
                            <option value="5+1 months">5+1 months</option>
                            <option value="7+1 months">7+1 months</option>
                            <option value="1 year">1 year</option>
                        </select>
                        
                        <label htmlFor="contact-update">Contact</label>
                        <input 
                            type="number" 
                            id="contact-update" 
                            name="contact"
                            value={formData.contact}
                            onChange={formInputOnchangeHandler}
                            required
                        />
                        
                        <div className="button-group">
                            {/* Cancel button: Calls the prop to close the modal */}
                            <button type="button"  className="cancel-button" onClick={updateFormCancelHandler}>
                                Cancel
                            </button>
                            {/* Update button: Triggers the form submission */}
                            <button type="submit" className="update-button">Update Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateUserForm;
