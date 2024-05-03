import React, { useEffect, useState } from 'react'
import { Navbar_Component } from '../components/Navbar_Component'
import { User_Profile_Section } from '../components/User_Profile_Section'
import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import axios_instance from '../config/axios';
import { Custom_Button } from '../components/Custom_Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { set_user_auth_and_data } from '../store/slices/user_data_slice';



const Home = () => {
    const {isLoggedIn} = useSelector((store)=>store.user_data)
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();
    
    const getUserData = async()=>{
      try {
          const getdata = await axios_instance.get('/user', {withCredentials:true})
          
          dispatch(set_user_auth_and_data({isLoggedIn: getdata.data.success, data:getdata.data.data}));
          
      } catch (error) {
          console.log("error", error);
      }
  };

    useEffect(() => {
        getUserData();
      axios_instance.get('/post').then((res)=>{
        const resdata = res.data.data
        setData(resdata)
       
      }).catch((err)=>{
        console.log("error", err)
      })
      
    }, [])



    return (
        <div className='bg-bg_color'>

            <Navbar_Component />
{isLoggedIn ? 
<div className='mx-2 flex justify-between flex-wrap'>
<div className='my-2 w-[30%]'>
    <Link to="/create-blog">
    <Custom_Button>
        Create Post
    </Custom_Button>
    </Link>
    </div>
    <div className=' my-2 w-[30%]'>
    <Link to="/userpost">
    <Custom_Button>
        Your Posts
    </Custom_Button>
    </Link>
    </div>
    </div>: ""
}
            <div className='px-3'>

               
              
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4'>


                {data.map((li,i)=>{
                    return(
                    <div key={i} className='rounded-md overflow-hidden  bg-white max-w-full h-full  mx-2 my-2'>
                        <div className='space-y-2 py-3'>
                            <div  className='px-3 flex items-center justify-between'>
                                <div>
                                    <h2 className='font-bold text-lg text-primary_color'>
                                        {li.user_id.first_name} {li.user_id.last_name}
                                    </h2>
                                    

                                </div>

                                <button>
                                <BsThreeDots size={25} color='gray'  />
                                </button>



                            </div>
                            <img className='h-[200px] w-full object-cover' src={li.image_url} />

                            <div className='px-3 space-y-2'>
                                <h1 className='font-medium text-xl'>
                                   {li.title}
                                </h1>

                                <p>{li.description}</p>

                                <div className='flex items-center justify-between'>
                                    <p className='text-sm text-gray-400' >1d ago</p>


                                    <div className='flex items-center space-x-1'>
                                        <IoEyeOutline color='gray' />
                                        <p className='text-sm text-gray-400' >{li.views}k views</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    )
 })} 



                </div>
              
            </div>



        </div>
    )
}

export { Home }
