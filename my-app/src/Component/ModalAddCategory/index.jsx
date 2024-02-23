import './style.css'
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import * as yup from "yup"
import {useFormik} from "formik"
import { useDispatch } from 'react-redux';
import { registreCat } from '../../features/categorySlice';


const ModalAddCategory = ({darkMode,setShowModalCat,showModalCat}) => {
    const dispatch = useDispatch()
    

   
    let categorySchema = yup.object().shape({
      
        title:yup.string().required('title is required'),
     }) 
     const formik = useFormik({
       // validationSchema:signupSchema,
      initialValues:{
       title:"",
      },
      validationSchema:categorySchema,
       onSubmit:(values)=>{
      
       
         dispatch(registreCat(values))
          formik.resetForm();
        setTimeout(()=>{
            setShowModalCat(!showModalCat)
        },1000)}
       
         
       
     })
  return (
    <div className=' fixed top-[100px] left-0 bg-[#4e4b4b88] w-[100%] h-[100%] backdrop-blur-[5px] z-50'>
        <form onSubmit={formik.handleSubmit} className={`w-[90%] mt-[100px]  md:w-[60%] ${darkMode ? 'bg-dark text-slate-50' : 'bg-slate-50'}    h-[max-content] p-[20px] rounded-xl mx-auto mt-[50px] relative`}>
        <CancelIcon className='absolute top-0 right-0 font-extrabold cursor-pointer' onClick={()=>setShowModalCat(!showModalCat)} />
        <div>
           {formik.touched.title &&  formik.errors.title && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.title}</span>}
            <input type="text" id="company" name="title" onChange={formik.handleChange('title')} value={formik.values.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title Category" />
        </div>  
        <button type="submit" className='yy shadow-2xl p-[10px] rounded-lg mx-auto block mt-[10px]'>Add Category</button>
        </form>
    </div>
  )
}
ModalAddCategory.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setShowModalCat: PropTypes.bool.isRequired,
    showModalCat: PropTypes.func.isRequired,
  };
export default ModalAddCategory