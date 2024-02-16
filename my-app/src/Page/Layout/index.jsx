import { Outlet } from "react-router-dom"
import NavBar from "../../Component/NavBar"
import PropTypes from 'prop-types';


const Layout = ({darkMode,setDarkMode,showModal ,setShowModal}) => {

  return (
   <>
   <NavBar setDarkMode={setDarkMode} darkMode={darkMode} setShowModal={setShowModal} showModal={showModal}  />
   <Outlet/>

   </>
  )
}
Layout.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal:PropTypes.func.isRequired,
};

export default Layout