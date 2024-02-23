import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Error from './pages/Error'
import Footer from './components/Footer'
import Logout from './pages/Logout'
import AdminLayouts from './components/layouts/AdminLayouts'
import AdminUser from './pages/AdminUser'
import AdminContact from './pages/AdminContact'
import UpdateUser from './pages/update/UpdateUser'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/service' element={<Service />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Logout' element={<Logout />}/>
          <Route path='*' element={<Error />} />

          <Route path='/admin' element={<AdminLayouts />}>
          <Route path='users' element={<AdminUser />} />
          <Route path='contacts' element={<AdminContact />} />
          </Route>

          <Route path='/admin/users/update/:id' element={<UpdateUser />}/>
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App