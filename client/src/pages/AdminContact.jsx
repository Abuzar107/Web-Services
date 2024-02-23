import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

function AdminContact() {

  const [contacts , setContacts] = useState([]);
  const {authorizationToken} = useAuth();

  useEffect(() => {
    getAllContacts();
  }, [])

  const getAllContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/contacts' , {
        method: 'GET',
        headers:{
          Authorization : authorizationToken
        }
      })

      if(response.ok){
        const jsonData = await response.json();
        setContacts(jsonData);
        console.log(jsonData);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handelDelete = async (id) => {
    try {
      const responseFromDelete = await fetch(`http://localhost:5000/admin/contacts/delete/${id}`, {
        method: 'DELETE'
      })
      
      if(responseFromDelete.ok){
        toast.success("Message Deleted SuccessFully");
        getAllContacts();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>

        <tbody>
          {contacts.map((curEle , index) => {
            return(
              <tr key={index}>
                <td>{curEle.username}</td>
                <td>{curEle.email}</td>
                <td>{curEle.message}</td>
                <td><button onClick={()=> handelDelete(curEle._id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminContact