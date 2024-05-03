import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios_instance from '../config/axios'
import { User_Profile_Section } from './User_Profile_Section'
import { data } from 'autoprefixer'
import { AiOutlineClose } from 'react-icons/ai'

const Navbar_Component = () => {
    const {isLoggedIn,user_data} = useSelector((store)=>store.user_data);
    console.log(user_data,"data")
    const [sidebar, setSidebar] = useState(false);

    
    
// console.log(userData, "userData")
    // console.log(isLoggedIn)
    return (
        <div className='bg-primary_color h-20 px-3 flex items-center justify-between'>


            <div className='text-3xl text-white font-bold'>
               <Link to="/"> Logo</Link>
            </div>


            {isLoggedIn ?  <div className='space-x-3 text-white font-medium'>
                <img onClick={()=> setSidebar(true)} src={user_data && user_data.profile_image } alt="Profile" className='w-[40px] h-[40px] rounded-full cursor-pointer'/>
            </div> : 
            
            
            <div className='space-x-3 text-white font-medium'>
                <Link to='/login'>
                    Login</Link><span>
                    |</span><Link to='/signup'>
                    Signup</Link>
            </div>
            }
            {sidebar ? 
            <div className={
                sidebar
                  ? "fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300"
                  : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
              }>
                <AiOutlineClose
          onClick={() => setSidebar(false)}
          size={30}
          color='black'
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4 font-medium text-primary_color">
          My Profile
        </h2>
            <User_Profile_Section userData={user_data}/> 
            </div>
            : ""}
        </div>
    )
}

export { Navbar_Component }
