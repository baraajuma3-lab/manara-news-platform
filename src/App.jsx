import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import RegisterStep2 from './pages/RegisterStep2'
import Login from './pages/Login'
import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register-step2" element={<RegisterStep2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App