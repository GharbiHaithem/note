import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editRecette, recettes as fnRecettes } from '../../features/recetteSlice';
import './style.css';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { MdOutlineColorLens } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiEdit } from 'react-icons/fi';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../node_modules/video-react/dist/video-react.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import Container from '@mui/material/Container';
import { ControlBar, Player, VolumeMenuButton } from 'video-react';
const Home = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { recettes, totalRecords, isLoading } = useSelector((state) => state?.recette);
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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fnRecettes());
  }, []);

  const navigate = useNavigate();
  const [edit, setEdit] = useState({id: null});

  const [color, setColor] = useState('blue');
  const linearGradientValue = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient');
  const linearGradientValue1 = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient1');
  const linearGradientValue2 = getComputedStyle(document.documentElement).getPropertyValue('--linear-gradient2');

  const handleSubmit = (id) => {
  const data ={
    id,
    description,
    title
  }

  dispatch(editRecette(data))
  setTimeout(()=>{
    setEdit({id:''})

  },200)
  };

  useEffect(() => {
    console.log('Le composant est mis à jour !');
    // Autres opérations après la mise à jour
  }, [edit]);

  return (
    <>
      <div className="h-[100vh] relative py-[100px]">
        {
          isLoading ? (
            <div className="vvv ">
              <CircularProgress disableShrink />
            </div>
          ) : (<>
             <div className="w-[90%] md:w-[90%] mb-28 mx-auto gap-[20px] grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 h-[max-content] p-3">
          { (
            recettes &&
            recettes?.length > 0 &&
            recettes?.map((r) => (
              <Card
                key={r?._id}
                className={`card  ${
                  darkMode
                    ? 'border relative bg-dark text-slate-50 rounded-sm h-full  border-slate-100 '
                    : 'shadow-lg'
                } flex flex-col w-full  h-full `}
              >
                <div
                  className={`relative text-center text-slate-50 p-[10px] cc  txt-stroke`}
                  style={{
                    background: color ? color : 'linear-gradient(10deg, #b2cceb, #3d31eae7)',
                  }}
                onClick={()=>{
                  setTitle(r?.title)
                  setDescription(r?.description)
                  setEdit({ id:r?._id})}}  
                >
                {edit.id !== r?._id &&  r?.title }
               {edit.id !== r?._id && <div className='absolute top-0 right-0 text-white aaaa'>edit</div>}
               {edit.id === r?._id && <>
              {edit.id === r?._id  && <input type='text' name='title' style={{border:'none' , background:'transparent',outline:'none'}} onChange={(e)=>setTitle(e.target.value)} value={title} />}
               </>}
                </div>
   
                <Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Autoplay, Pagination, Navigation]}
  className="mySwiper"
  nested={true}
>
  {r?.images?.map((_img) => (
    <SwiperSlide key={_img?.public_id}>
      {_img?.url.endsWith(".jpg") || _img?.url.endsWith(".webp") ? (
        <img src={_img?.url} className='object-cover' alt={_img?.public_id} />
      ) : (
        <div className='h-[100%] p-0'>
          <Player
         
         playsInline
         src={_img?.url}
          
       >
         <ControlBar autoHide={false} disableDefaultControls>
        <VolumeMenuButton />
        <VolumeMenuButton vertical />
      </ControlBar>
       </Player>
        </div>
      )}
    </SwiperSlide>
  ))}
</Swiper>

                <div className='p-[10px] h-[max-content]  relative parag'>
                  {edit.id !== r?._id && (
                    <Typography
                      className={`txt ${darkMode ? 'text-slate-50' : 'text-dark'}`}
                      dangerouslySetInnerHTML={{ __html: r?.description && r?.description.slice(0, 300) + ' ...' }}
                    ></Typography>
                  )}

                  <div
                    className={`absolute top-0 right-0  text-white bb`}
                    style={{
                      background:
                        color && r.id === edit.id
                          ? 'transparent'
                          : color && edit.id !== r?._id
                          ? color
                          : '',
                      opacity: 0.7,
                    }}
                  >
                    {edit.id !== r?._id && (
                      <FiEdit
                        style={{ fontSize: '30px', color: 'black', cursor: 'pointer' }}
                        onClick={() => {
                          setDescription(r?.description);
                          setTitle(r?.title)
                          setEdit({ id: r?._id });
                        }}
                      />
                    )}
                  </div>

                  {edit && edit.id === r._id && (
                    <>
                      <div>
                        <ReactQuill
                          value={description}
                          onChange={(value) => setDescription(value)}
                          theme='snow'
                          className={`mt-2 ${darkMode ? 'text-white' : 'text-dark'}`}
                          name='description'
                        />
                   
                      </div>
                    </>
                  )}

                </div>
            {edit && edit.id === r._id  &&   <button
  type='button'
  onClick={()=>handleSubmit(r._id)}
  className='text-center p-2 mt-3 mx-auto block w-20 mb-5'
  name='submit'
  style={{
    background: color,
    color: 'white',
    zIndex: 1000,
    pointerEvents: 'auto',
   
  }}
>
  Edit
</button> }
              </Card>
            ))
          )}
        </div> 
          
          </>)
        }
    
      </div>

      <div
        className='relative w-[50px] h-[50px]'
        ref={divRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='fixed bottom-10 left-10'>
          <MdOutlineColorLens style={{ fontSize: '40px' }} />
          <div
            className={`bloc-1 flex flex-col items-center justify-center gap-1 absolute   ${
              isHovered === false ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div
              className='bloc-1-1'
              style={{ background: 'var(--linear-gradient)' }}
              onClick={() => {
                localStorage.setItem('color', color);
                setColor(linearGradientValue);
              }}
            ></div>

            <div
              className='bloc-1-2'
              style={{ background: 'var(--linear-gradient1)' }}
              onClick={() => {
                localStorage.setItem('color', color);
                setColor(linearGradientValue1);
              }}
            ></div>
            <div
              className='bloc-1-3'
              style={{ background: 'var(--linear-gradient2)' }}
              onClick={() => {
                localStorage.setItem('color', color);
                setColor(linearGradientValue2);
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default Home;
