import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recettes as fnRecettes } from '../../features/recetteSlice';
import './style.css'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { MdOutlineColorLens } from "react-icons/md";
const Home = ({darkMode}) => {
  console.log(darkMode)
  const dispatch = useDispatch()

  const{recettes} = useSelector(state=>state?.recette)
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const[color,setColor]  = useState(null)
  const linearGradientValue = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient');
  const linearGradientValue1 = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient1');
  const linearGradientValue2 = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient2');
  console.log(linearGradientValue)
  useEffect(()=>{
    dispatch(fnRecettes())

  },[dispatch])

  return (
<>


<div className="h-[100vh] relative mt-[70px]">

    <div className="w-[90%] mx-auto    gap-[20px] rounded-lg grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1   h-[max-content] p-3  ">
     
     {
      recettes && recettes?.map((r)=>(
        <Card key={r?._id} className={` ${darkMode ? 'border bg-dark text-slate-50 rounded-sm h-full  border-slate-100 ' : 'shadow-lg'} flex flex-col gap-[10px] w-full  h-full `}>
        <div className={`text-center text-slate-50 p-[10px]   txt-stroke`} style={{background:color ? color: 'blue'}} >{r?.title}</div>
        <div className='p-[10px]'>
      <Typography className={`${darkMode ? 'text-slate-50': 'text-dark'}`} dangerouslySetInnerHTML={{ __html: r?.description.slice(0,300) + " ..." }}></Typography>
      <br/> <span className=' p-2 rounded-lg text-slate-50 w-[80%] mt-4 mb-2 mx-auto block text-center' style={{background:color ? color : 'blue' }}>Read Moore</span>
        </div>
      
  </Card>
      ))
     }
    
    
  
    
    
    </div>
    </div>
    <div className=" relative  w-[50px] h-[50px] "   ref={divRef}   onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div  className=' fixed bottom-10 left-10'>
      <MdOutlineColorLens style={{fontSize:'40px'}}    />
      <div className={`bloc-1 flex items-center justify-center gap-3 absolute top-1 translate-x-4 translate-y-[-15px] left-20 ${isHovered === false ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bloc-1-1" style={{ background:'var(--linear-gradient)' }} onClick={()=>setColor(linearGradientValue)}></div>

        <div className='bloc-1-2' style={{ background:'var(--linear-gradient1)' }} onClick={()=>setColor(linearGradientValue1)}></div>
        <div className='bloc-1-3' style={{ background:'var(--linear-gradient2)' }}  onClick={()=>setColor(linearGradientValue2)}></div>
      </div>
      </div>







</div>
</>
  
  )
}
Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
export default Home