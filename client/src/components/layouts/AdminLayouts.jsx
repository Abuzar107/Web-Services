import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { GrServices } from "react-icons/gr";
import { FaHome } from "react-icons/fa";

function AdminLayouts() {
  return (
    <>
    <header>
      <div className="container">
      <nav>
        <ul>
          <li><NavLink to="/admin/users"><FaUser />Users</NavLink></li>
          <li><NavLink to="/admin/contacts"><GrContact />Contacts</NavLink></li>
          <li><NavLink to="/service"><GrServices />Services</NavLink></li>
          <li><NavLink to="/"><FaHome />Home</NavLink></li>
        </ul>
      </nav>
    </div>
    </header>
    <Outlet />
    </>
  )
}

export default AdminLayouts