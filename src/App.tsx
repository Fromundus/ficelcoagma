import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import GuestLayout from './layouts/GuestLayout'
import AdminLayout from './layouts/AdminLayout'
import { useAuth } from './store/auth'
import React from 'react'
import AccountSettings from './pages/Admin/AccountSettings'
import Landing from './pages/Landing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Registered from './pages/Registered'
import Dashboard from './pages/Admin/Dashboard'
import RegisteredMembers from './pages/Admin/RegisteredMembers'
import { Bounce, ToastContainer } from 'react-toastify'
import RegisteredMemberPage from './pages/Admin/RegisteredMemberPage'
import MemberRegistration from './pages/Admin/MemberRegistration'
import OnlineRegistration from './pages/OnlineRegistration'
import NotFound from './pages/NotFound'
import OnsiteLogin from './pages/OnsiteLogin'
import PreRegLogin from './pages/PreRegLogin'
import Unauthorized from './pages/Unauthorized'
import PreRegLayout from './layouts/PreRegLayout'
import OnsiteLayout from './layouts/OnsiteLayout'
import Accounts from './pages/Admin/Accounts'

function App() {
  const { token, fetchUser } = useAuth();

    React.useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}

        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Landing />} />

          <Route path="/prereg" element={<PreRegLogin />} />
          <Route path="/onsite" element={<OnsiteLogin />} />
          <Route path='/admin-login' element={<Login title='Admin Login' required_role='admin' />} />
          <Route path='/online' element={<OnlineRegistration />} />
          
          <Route path='/registered/:reference_number' element={<Registered />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute requiredRole="pre" />} >
          <Route path='pre' element={<PreRegLayout />} >
            <Route index element={<MemberRegistration />} />
            <Route path='account-settings' element={<AccountSettings />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute requiredRole="ons" />} >
          <Route path='ons' element={<OnsiteLayout />} >
            <Route index element={<MemberRegistration />} />
            <Route path='account-settings' element={<AccountSettings />} />
          </Route>
        </Route>
        
        <Route element={<PrivateRoute requiredRole="admin" />} >
          <Route path='admin' element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='member-registration' element={<MemberRegistration />} />
            <Route path='registered-members' element={<RegisteredMembers />} />
            <Route path='registered-members/:id' element={<RegisteredMemberPage /> } />
            <Route path='accounts' element={<Accounts />} />
            <Route path='account-settings' element={<AccountSettings />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Bounce}
        />
    </BrowserRouter>
  )
}

export default App
