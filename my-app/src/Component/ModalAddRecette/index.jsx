import './style.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoAdd } from "react-icons/io5";
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { categories } from '../../features/categorySlice';
import { useFormik } from 'formik';
import * as yup from "yup"
import { recettes, registreRecette } from '../../features/recetteSlice';
import Dropzone from 'react-dropzone'
import { deleteImg, upload } from '../../features/uploadSlice';
import {MdOutlineCancel} from 'react-icons/md'
import Container from '@mui/material/Container';

import { Player } from 'video-react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const ModalAddRecette = ({darkMode,showModal,setShowModal,showModalCat,setShowModalCat}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(categories())
    },[dispatch])
    const [buttonClicked, setButtonClicked] = useState(false);
    const{category} = useSelector(state=>state?.cat)
    const schema=yup.object().shape({
        title : yup.string().required('title is required'),
        description:yup.string().min(150).required('description is required'),
        category:yup.string().required('category required'),
       
        
       })
    const formik = useFormik({
        initialValues:{
          title:'',
          description:'',
          category:'',
          images:'',
       },
       validationSchema:schema,
       onSubmit:(values)=>{
        if(buttonClicked){
     dispatch(registreRecette(values))
     setTimeout(()=>{
        setShowModal(!showModal)
        dispatch(recettes())
     },100)
    
      formik.resetForm();
    
     
       }}
      })
    
      const uploadState = useSelector(state=>state.upload.images)
      const{isLoading}  = useSelector(state=>state.upload)
      const img = [];
      uploadState?.forEach(element => {
      img.push({
        public_id:element.public_id,
        url:element.url
      })    
      })

      useEffect(()=>{
        formik.values.images=img;
       
        },[img])
        const filterData = (fileId) =>{
          alert(fileId)
          dispatch(deleteImg(fileId))
        
        }

       
  return (
    <div className=' fixed top-0 left-0 bg-[#0008] w-[100%] h-[100%] backdrop-blur-[5px] z-50 '>
        <form onClick={formik.handleSubmit} className={`w-[90%]   md:w-[80%] ${darkMode ? 'bg-dark opacity-65 text-white' : 'bg-slate-50'}  overflow-y-scroll  h-[555px] p-[20px] rounded-xl mx-auto mt-[50px] relative`}>
<CancelIcon className='absolute top-0 right-0 font-extrabold cursor-pointer' onClick={()=>setShowModal(!showModal)} />
        <div>
        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input onChange={formik.handleChange('title')} 
    name='title'   value={formik.values.title} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title recette"  />
          {formik.touched.title &&  formik.errors.title && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.title}</span>}
          
            <div className='flex w-[100%] items-center gap-[30px] mt-[10px]'>
           <div className=' w-[80%]'>
         
  <select onChange={formik.handleChange('category')} 
    name='category'   value={formik.values.category} id="countries" className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a category</option>
  {
    category && category?.map((c)=>(
<option key={c?._id} value={c?._id}>{c?.titleCategory}</option>
    ))
  }

  </select>
  {formik.touched.category &&  formik.errors.category && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.category}</span>}
          
           </div>
  <span onClick={()=>setShowModalCat(!showModalCat)} className={`yy w-[20%] ${darkMode ? 'bg-slate-50 text-slate-900' : ''} mb-0 items-center border hover:border hover:border-slate-100 hover:rounded-lg hover:text-slate-100 border-slate-950 rounded-lg  text-xs font-light flex justify-center h-[40px] cursor-pointer`}><IoAdd  /> <span className="hidden sm:inline">ADD CATEGORY</span></span>
            </div>
         <div className='border border-red-950  relative '>
       
         <Dropzone onDrop={acceptedFiles => dispatch(upload(acceptedFiles))}  >
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className=''>
        <div className="mb-3">
  <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
  <input className="form-control" type="file" id="formFileMultiple" multiple />
</div>
        </p>
      </div>
      { isLoading &&
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>}
    </section>
  )}
</Dropzone>
         </div>
<div className='flex flex-wrap'>
         
       
  
            {uploadState.map((i,j) => {
              
             return (
                          <div key={j} className=' p-2 position-relative w-[25%] h-[150px] ' style={{boxShadow:'0 0 10px #ddd',border:"1px solid red "}} >
            
          <button type='button' onClick={()=>filterData(i.public_id)} className='position-absolute bg-transparant' style={{top:'10px',right:'10px',fontSize:'20px',border:'none',background:'white'}}><MdOutlineCancel style={{borderColor:'white',color:'black'}}/></button>
        
             {i.url.endsWith(".jpg") ?  
          

<img src={i.url} alt={i.public_id}  className='w-full h-full object-cover' /> 
        
            :(
                <Container>
             
                <Player
    playsInline
  
    src={i?.url}
  />
              </Container>
             ) }
              </div>
             )
            })}
           </div>

            <ReactQuill theme="snow" className='mt-12 ' name='description' value={formik.values.description}  onChange={formik.handleChange('description')}  />
            {formik.touched.description &&  formik.errors.description && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.description}</span>}
        </div>
        <button type="submit" onClick={()=>setButtonClicked(true)}  className='yy border border-black p-[10px] rounded-lg mx-auto block mt-[10px]'>Add Recette</button>
        </form>
    </div>
  )
}
ModalAddRecette.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    showModalCat: PropTypes.bool.isRequired,
    setShowModalCat: PropTypes.func.isRequired,
    
  };
export default ModalAddRecette