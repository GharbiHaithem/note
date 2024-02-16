import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registreUser } from '../features/AuthSlices';

const Signup = () => {
  const dispatch = useDispatch()

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
  
    const res = axios.post("http://localhost:5000/api/save-login", {
      firstname: decoded.family_name,
      lastname: decoded.given_name,
      email: decoded.email,
      picture: decoded.picture
    });

    res.then((result) => {
      console.log(result);
      toast.info(result.data.message);
  
      localStorage.setItem('customer',JSON.stringify(result.data.findUser))
      localStorage.setItem('token',JSON.stringify(result.data.token))
 
    });
  };

  const handleGoogleError = () => {
    console.log('Échec de la connexion');
  };
  let signupSchema = yup.object().shape({
    lastname:yup.string().required('name is required'),
    firstname:yup.string().required('name is required'),
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    password:yup.string().required('password is required').min(4).max(20),
    adress:yup.string().required('adress is required').min(4).max(20)
    
  }) 

  const formik = useFormik({
    // validationSchema:signupSchema,
   initialValues:{
    lastname: "",
    firstname:'',
    email:"",
    password:"",
    adress:"",
   },
   validationSchema:signupSchema,
    onSubmit:(values)=>{
   
      alert(JSON.stringify(values,null,2))
      dispatch(registreUser(values))
       formik.resetForm();
  
      setTimeout(()=>{
     
      },2000)
      
    }
  })

  return (
   <div className='h-screen bg-gradient-to-r text-sm from-blue-100 via-purple-200 to-pink-200 '>
    <div className='mx-auto h-[100%] w-[80%]  md:w-[max-content] md:mx-auto flex flex-col  justify-center  p-[10px]'>
   <div className="relative text-3xl mx-auto font-light  mb-5 border-5 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-2 rounded-md">
  <span className="bg-gradient-to-r text-sm from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text p-2 rounded-md font-bold">
    SIGNUP FORM
  </span>
</div>
<form onSubmit={formik.handleSubmit}>
      <div className="mb-4 flex flex-col">
       
        <input type="text" id="default-input" onChange={formik.handleChange('lastname')} value={formik.values.lastname}  placeholder='Lastname...' className="focus:outline-none w-[300px] p-2.5  text-gray-900 border-b border-blue-700  bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
     
        {formik.touched.firstname && formik.errors.firstname &&<span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 text-center px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.lastname}</span>}
      </div>
      <div className="mb-4 flex flex-col">
       
       <input type="text" id="default-input" onChange={formik.handleChange('firstname')} value={formik.values.firstname}  placeholder='Fastname...' className="focus:outline-none w-[300px] p-2.5  text-gray-900 border-b border-blue-700  bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       {formik.touched.firstname && formik.errors.firstname && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.firstname}</span>}
     </div>
      <div className='mb-4 flex flex-col'>
       
        <input type="email" onChange={formik.handleChange('email')} value={formik.values.email} required id="small-input" placeholder='Email ...' className="focus:outline-none border-b border-blue-700 w-[300px] p-2 text-gray-900 bg-transparent bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.email && formik.errors.email && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.email}</span>}
      </div>
    
      <div className="mb-4 flex flex-col">
       
       <input type="password" onChange={formik.handleChange('password')} value={formik.values.password} id="default-input"  placeholder='Password...' className="focus:outline-none w-[300px] p-2.5  text-gray-900 border-b border-blue-700  bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       {formik.touched.password && formik.errors.password && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.password}</span>}
     </div>
     <div className='mb-4 flex flex-col'>
      
       <textarea id="small-input" onChange={formik.handleChange('adress')} value={formik.values.adress} placeholder='Adress ...' className="focus:outline-none border-b border-5 border-blue-700 w-[300px] p-2 text-gray-900 bg-transparent bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       {formik.touched.adress && formik.errors.adress &&<span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.adress}</span>}
     </div>
   
      <p>Already Have an Account?<Link className='text-blue-700 underline font-semibold' to='/login'>Login</Link></p>
        <button type='submit' className='p-2 rounded-lg text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-[300px] mt-10 mb-4'>Register</button>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
          width="300px"
          size='large'
          theme=''
          shape='circle'
          
        >
        
        </GoogleLogin>
        </form>
    </div>
  
   </div>
  );
};

export default Signup;
