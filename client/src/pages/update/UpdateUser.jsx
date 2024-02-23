import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './update.css'
import { toast } from 'react-toastify';

function UpdateUser() {
    const {id} = useParams();
    const [username , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            phone,
            id
        }
        
        try {
            const response = await fetch(`http://localhost:5000/admin/users/update/${id}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            "body": JSON.stringify(user)
            })

            if(response.ok){
                toast.success('Data Updated SuccessFully');
                navigate("/admin/users");
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='containerupdate'>
        <div className="username">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Name' onChange={((e) => setName(e.target.value))}/>
        </div>
        <div className="email">
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Email' onChange={((e) => setEmail(e.target.value))}/>
        </div>
        <div className="password">
            <label htmlFor="">Phone</label>
            <input type="text" placeholder='Phone' onChange={((e) => setPhone(e.target.value))}/>
        </div>
        <div className="button">
            <button type='submit' onClick={handleSubmit}>Update</button>
        </div>
    </div>
    </form>
  )
}

export default UpdateUser