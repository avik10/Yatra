import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserHome from './pages/users/UserHome'
import CaptainHome from './pages/captains/CaptainHome'
import UserLogin from './pages/users/UserLogin'
import UserSignup from './pages/users/UserSignup'
import CaptainLogin from './pages/captains/CaptainLogin'
import CaptainSignup from './pages/captains/CaptainSignup'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/wrappers/UserProtectedWrapper'
import CaptainProtectedWrapper from './pages/wrappers/CaptainProtectedWrapper'
import UserLogout from './pages/users/UserLogout'
import CaptainLogout from './pages/captains/CaptainLogout'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />

        {/* user routes */}

        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />

        <Route path='/user-home' element={
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        } />

        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />



        {/* captains routes */}

        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        <Route path='/captain-logout' element={
          <UserProtectedWrapper>
            <CaptainLogout />
          </UserProtectedWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />

      </Routes>
    </>
  )
}

export default App
