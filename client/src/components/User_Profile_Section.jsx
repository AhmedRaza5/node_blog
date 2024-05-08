import React from 'react'
import axios_instance from '../config/axios'
import Cookie from "js-cookie";



const User_Profile_Section = ({userData}) => {
    const {first_name,last_name,email,username} = userData

    
    const logout = async()=>{
        // alert('Cookie removed successfully');
        try {
            await axios_instance.delete('/logout')
            document.cookie = 'auth_token=; Max-Age=0; path=/; domain=https://nodeprojectahmedraza-ahmed-razas-projects-f0a0cba7.vercel.app/';
            // Cookie.remove('auth_token', {path:'/',domain: 'https://nodeprojectdfdfhklo-kjhudfij-razas-projects-f0a0cba7.vercel.app/'});
            window.location.reload();
        }catch (error) {
            console.log(error,"error")
        }
        
    }
    // document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return (
        <div className='rounded-md px-3 py-4 mt-3 bg-white max-w-full '>



            {/* <h1 className='font-medium text-primary_color text-xl mb-3'>
                My Profile
            </h1> */}



                <div className='' >
                    <div className='grid grid-cols-1 space-y-3'>
                        <div>
                            <p className='text-secondary_color text-md'>
                                First name
                            </p>
                            <h1 className='text-lg font-medium text-primary_color'>
                                {first_name}
                            </h1>
                        </div>
                        <div>
                            <p className='text-secondary_color text-md'>
                                Last name
                            </p>
                            <h1 className='text-lg font-medium text-primary_color'>
                                {last_name}
                            </h1>
                        </div>
                        <div>
                            <p className='text-secondary_color text-md'>
                                Username
                            </p>
                            <h1 className='text-lg font-medium text-primary_color'>
                                {username}
                            </h1>
                        </div>
                        <div>
                            <p className='text-secondary_color text-md'>
                                Email address
                            </p>
                            <h1 className='text-lg font-medium text-primary_color'>
                                {email}
                            </h1>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='mt-8 bg-primary_color text-white py-2 px-4 w-fit rounded-md'>
            <button onClick={logout}>Logout</button>
                </div>
        </div>

    )
}

export { User_Profile_Section }
