import React, { useEffect, useState } from 'react'
import { Navbar_Component } from '../components/Navbar_Component'
import { User_Profile_Section } from '../components/User_Profile_Section'
import Input_Field from '../components/Input_Field'
import { Custom_Button } from '../components/Custom_Button'
import axios_instance from '../config/axios'



const Create_Blog = () => {
    const [data, setData] = useState({})
   

    const change_handle = (e) => {
        const { value, id } = e.target

        setData({ ...data, [id]: value })
    }

    const submit_handle = (e) => {
        e.preventDefault()
        axios_instance.post('/post',data,{withCredentials:true}).then((res)=>{
            // console.log('created',res)
            alert("Your Post has been created")
        }).catch((err)=>{
            console.log('error',err)
        })
    }

    

    return (
      
        <div className='bg-bg_color h-[100dvh]'>

            <Navbar_Component />


            <div className='px-3'>

{/* 
                <div >
                    <User_Profile_Section userData={userData}/>

                    
                </div> */}

            </div>
                <div className='m-4 flex align-middle justify-center'>
            <form onSubmit={submit_handle} className='bg-white rounded-md max-w-md w-full py-6 px-3 grid grid-cols-2  gap-5 m-auto'>

<div className='text-primary_color col-span-2 text-center text-3xl font-bold'>
    <h1>
        Create Post
    </h1>
</div>


<div className='col-span-2 mx-auto'>
 
</div>


<div className='col-span-2'>
    <Input_Field id='image_url' type='text' required={true} onChange={change_handle} placeholder='Enter image url'/>
</div>
<div className='col-span-2'>
    <Input_Field id='title' type='text' required={true} onChange={change_handle} placeholder='Post Title' />
</div>
<div className='col-span-2'>
    <Input_Field id='description' type='text' required={true} onChange={change_handle} placeholder='Description' />
</div>
<div className='col-span-2'>
    <Input_Field id='views' type='number' required={true} onChange={change_handle} placeholder='Views' />
</div>

<div className='col-span-2'>
    <Custom_Button type='submit' >
        POST
    </Custom_Button>
</div>







</form>
</div>
        </div>
    )
}

export { Create_Blog }
