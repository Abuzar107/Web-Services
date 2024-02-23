import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


function AdminUser() {

  const [user , setUser] = useState([]);
  const {authorizationToken} = useAuth();
  const navigate = useNavigate();

  const getAllUserData  = async () => {
    try {
        const response = await fetch('http://localhost:5000/admin/users', {
        method: 'GET',
        headers:{
          Authorization : authorizationToken
        }
      })

      const jsonData = await response.json();

      if(jsonData.message == false){
        // toast.error('Sorry Your Not Admin');
        toast.error('Sorry Your Not Admin', {
          toastId: 'success1',
        })
        navigate("/");
      }

      setUser(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  //delete user

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users/delete/${id}`, {
        method : 'DELETE',
        headers:{
          Authorization : authorizationToken
        }
      })

      if(response.ok){
        getAllUserData();
      }

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getAllUserData();
  }, [])

  return (
    <section>
      <div className="admin-user-section">
        <div className="container">
          <h1>Admin User Data</h1>
        </div>
        <div className="container admin-user">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {user.map((curUser , index) => {
                  return (
                    <tr key={index}>
                      <td>{curUser.username}</td>
                      <td>{curUser.email}</td>
                      <td>{curUser.phone}</td>
                      <td><Link to={`/admin/users/update/${curUser._id}`}>Update</Link></td>
                      <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
      </div>
    </section>
  )
}

export default AdminUser