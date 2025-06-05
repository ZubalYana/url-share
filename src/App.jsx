import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import AuthLayout from './components/AuthComponents/AuthLayout'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/auth' element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
