
import * as yup from 'yup';
import {useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/AuthSlices';
import { useEffect } from 'react';
import img from '../images/Mobile login-rafiki.png'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let signupSchema = yup.object().shape({
      
         email:yup.string().email('format invalid email').required('email is required'),
      //   mobile:yup.number().required('mobile is required'),
        password:yup.string().required('password is required').min(4).max(20),
       
        
      }) 
      const formik = useFormik({
        // validationSchema:signupSchema,
       initialValues:{
      
        email:"",
        password:"",
       
       },
       validationSchema:signupSchema,
        onSubmit:(values)=>{
       
      
          dispatch(loginUser(values))
           formik.resetForm();
      
          setTimeout(()=>{
         
          },2000)
          
        }
      })
      const {isLogin} = useSelector(state=>state?.auth)
      useEffect(()=>{
        if(isLogin === true) {
        
            navigate('/')
       
        }
      },[isLogin,navigate])
  return (
    <div className='h-screen bg-gradient-to-l text-sm from-slate-100  to-blue-100 '>
    <div className='mx-auto w-[80%] md:w-[max-content] md:mx-auto flex flex-col py-20  justify-center  p-[10px]'>
   <div className="relative text-3xl mx-auto font-light  mb-5 w-[90%] h-[300px]   p-2 rounded-md">
  <img  src={img} className='w-[100%] h-[100%] object-cover' alt='' />
</div>
<form onSubmit={formik.handleSubmit}>
     
      
     
      <div className='mb-4 flex flex-col'>
       
        <input type="email" onChange={formik.handleChange('email')} value={formik.values.email}  id="small-input" placeholder='Email ...' className="focus:outline-none border-b border-blue-700 w-[300px] p-2 text-gray-900 bg-transparent bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.email && formik.errors.email && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.email}</span>}
      </div>
    
      <div className="mb-4 flex flex-col">
       
       <input type="password" onChange={formik.handleChange('password')} value={formik.values.password} id="default-input"  placeholder='Password...' className="focus:outline-none w-[300px] p-2.5  text-gray-900 border-b border-blue-700  bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       {formik.touched.password && formik.errors.password && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.password}</span>}
     </div>
   
   
      <p>Create An Account?<Link className='text-blue-700 underline font-semibold' to='/signup'>Signup now</Link></p>
        <button type='submit' className='p-2 rounded-lg text-white bg-gradient-to-r from-blue-400 to-blue-100 w-[300px] mt-10 mb-4'>Login</button>
      
        
     
        </form>
    </div>
  
   </div>
  )
}

export default Login