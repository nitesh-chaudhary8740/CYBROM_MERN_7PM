
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ShowSingleUserDetails({users}) {
    const [selectedUser, setSelectedUser] = useState(null);
    const {id} = useParams()
    useState(()=>{
        if(!users) return
        const user = users.find(user=>
            id===user._id.toString()
        )
        setSelectedUser(user)
    },)
    console.log(id)
    // useEffect()
  console.log(Object.entries(selectedUser))
  return (
    <div >
        {!selectedUser?
        <h2>No user selected</h2>:
        <div className='user-profile-container'>
          
            </div>
        }
    </div>
  )
}

export default ShowSingleUserDetails
