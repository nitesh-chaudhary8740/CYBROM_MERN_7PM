import React from 'react'

function UserTableList({users,deleteHandler,setSelectedUser}) {
  return (
        <div className="display-container">
            <h1>Registered Users</h1>
            <table className="user-data-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Course</th>
                        <th>Duration</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        // Use a unique key for each row
                        <tr key={user._id || user.userName}> 
                            <td data-label="Username">{user.userName}</td>
                            <td data-label="Full Name">{user.fullName}</td>
                            <td data-label="Course">{user.courseName}</td>
                            <td data-label="Duration">{user.duration}</td>
                            <td data-label="Contact">{user.contact}</td>
                            <td data-label="Actions" className="action-cell">
                                <button className="edit-btn" onClick={()=>{setSelectedUser(user)}}>Edit</button>
                                <button className="delete-btn" onClick={()=>deleteHandler(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTableList
