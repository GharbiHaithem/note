
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Page/Signup';
import Login from './Page/Login';
import Layout from './Page/Layout';
import Home from './Page/Home';
import { useEffect, useState } from 'react';
import ModalAddRecette from './Component/ModalAddRecette';
import ModalAddCategory from './Component/ModalAddCategory';
import  PrivateRoute  from './routes/privateRoute';

// import { useSelector } from 'react-redux';
function App() {
  const[darkMode,setDarkMode] = useState(true)
console.log(darkMode)
useEffect(() => {
  const storedDarkMode = localStorage.getItem('darkMode');
  console.log(storedDarkMode)
  setDarkMode(storedDarkMode);
}, []);
const[showModal,setShowModal]  =useState(false)
const[showModalCat,setShowModalCat]  =useState(false)

 return (
    <div>
 
 <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

        <Route
            path="/"
            element={
              <div className={`transition-all duration-300 h-[max-content] ${darkMode ? 'bg-dark text-white ' : 'bg-white text-black'}`}>
                <Layout darkMode={darkMode} setDarkMode={setDarkMode} showModal={showModal} setShowModal={setShowModal} />
              </div>
            }
          >
        <Route index element={<PrivateRoute> <Home  darkMode={darkMode} setDarkMode={setDarkMode} setShowModal={setShowModal} /></PrivateRoute>} /> 
        </Route>
      </Routes>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
{
  showModal && <ModalAddRecette setShowModalCat={setShowModalCat} showModalCat={showModalCat} darkMode={darkMode} setDarkMode={setDarkMode}  showModal={showModal} setShowModal={setShowModal} />
 
}
{
   showModalCat && <ModalAddCategory showModalCat={showModalCat} setShowModalCat={setShowModalCat} darkMode={darkMode} setDarkMode={setDarkMode} />
}
</BrowserRouter>

    </div>
  )
}

export default App
