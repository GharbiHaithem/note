

import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { logOut } from '../../features/recetteSlice';
const NavBar = ({setDarkMode,darkMode,showModal,setShowModal}) => {

  useEffect(() => {
    // Vérifiez si la préférence du mode sombre est stockée dans localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(storedDarkMode=== true);
  }, [setDarkMode]);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', darkMode);
  };
  const{user} = useSelector(state=>state?.auth)
const dispatch = useDispatch()


const[colorStorage,setColorStorage] = useState(null)
useEffect(() => {
  const getColorFromStorage = localStorage.getItem('color');
  if (getColorFromStorage !== null) {
    setColorStorage(getColorFromStorage);
  }
}, []);
const handleStorageChange = (event) => {
  console.log('Storage change event:', event);
  if (event.key === 'color') {
    const getColorFromStorage = localStorage.getItem('color');
    console.log('Color from storage:', getColorFromStorage);
    if (getColorFromStorage !== null) {
      setColorStorage(getColorFromStorage);
    }
  }
};

useEffect(() => {
  console.log('Adding storage event listener');
  window.addEventListener('storage', handleStorageChange);

  // Nettoyer l'écouteur d'événements lors du démontage du composant
  return () => {
    console.log('Removing storage event listener');
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);
console.log(colorStorage)
  return (
    <div className={`h-[80px] ring-indigo-600  shadow-lg flex items-center fixed top-0 left-0 w-[100%] z-50 justify-between ${darkMode ? 'border-slate-50 bg-dark border-b-2' : 'bg-white'}`}>
      <div className=' h-full bbb mb-0 mx-3 font-black text-6xl w-[300px] flex justify-between  items-center ' style={{  backgroundClip: "text",
    color: "transparent",
    backgroundImage: `linear-gradient(70deg, #b2cceb, #557B83)`,

    WebkitBackgroundClip:'text',
    fontWeight: 400 }}>
     
       {user&&  Object.keys(user).length>0 && (user.lastname).toLowerCase()}
        
      </div>
     <div className='flex items-center gap-[20px] mx-[20px]'>
     <div className={`h-[50px] w-[50px] rounded-full shadow-lg flex justify-center items-center ${darkMode ? 'border-2 border-slate-100' : ''}`}>
     <div className="dropdown">
  <span className={`${darkMode ? 'text-slate-50' : 'text-dark'} dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {user !== undefined && user !== null && Object.keys(user).length > 0 &&   user?.firstname[0] + user?.lastname[0]  }
  </span>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li onClick={()=>{
       
  dispatch(logOut())
 
  }}><a className="dropdown-item flex items-center gap-2" href="#"><LogoutOutlinedIcon style={{fontSize: 'medium'}} />sign out</a></li>
  </ul>
</div>
     </div>

     <div>
        <span className=' border-2 w-full flex items-center justify-center cursor-pointer h-full  rounded-full shadow-2xl font-sans mb-0 p-[10px]' onClick={()=>setShowModal(!showModal)}>
<PlusOneIcon/>
        </span>
      </div>
     <div className={` border-2 mr-[5px] rounded-full shadow-2xl font-sans mb-0 p-[10px] ${darkMode ? 'bg-dark' : 'bg-gray-100' } cursor-pointer`} onClick={toggleDarkMode}>
   {darkMode ?  <WbIncandescentOutlinedIcon className='text-white bg-dark'/> : <Brightness6OutlinedIcon />
} 
      </div>
   
     </div>
    </div>
  )
}
NavBar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired
};

export default NavBar