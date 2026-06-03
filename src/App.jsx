// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Register from './pages/Register'
// import RegisterStep2 from './pages/RegisterStep2'
// import Login from './pages/Login'
// import Landing from './pages/Landing'
// import Dashboard from './pages/Dashboard'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/register-step2" element={<RegisterStep2 />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/landing" element={<Landing />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App



import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterStep2 from './pages/RegisterStep2'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Community from './pages/Community'
import VerifyNews from './pages/VerifyNews'
import NewsComposer from './pages/NewsComposer'
import MisinformationArchive from './pages/MisinformationArchive'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-step2" element={<RegisterStep2 />} />
   <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route path="/community" element={<Community />} />
<Route path="/verify-news" element={<VerifyNews />} />
<Route path="/news-composer" element={<NewsComposer />} />
<Route path="/archive" element={<MisinformationArchive />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App




