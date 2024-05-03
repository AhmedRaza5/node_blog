import React, { useEffect, useState } from 'react'
import axios_instance from '../config/axios';
import { Navbar_Component } from '../components/Navbar_Component';
import { BsThreeDots } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';
import Input_Field from '../components/Input_Field';

const UserPost = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [putId, setPutId] = useState(null);

    const change_handle =(e)=>{
        const { value, id } = e.target

        setUpdateData({ ...updateData, [id]: value })
    }

    const getUserPost = async()=>{
        try {
            const response = await axios_instance.get('/post/user',{withCredentials:true})
            setData(response.data.data)
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
     getUserPost();
    }, []);

    const submit_post = (e)=>{
        e.preventDefault();
        
        console.log(putId, "ID")
        
        axios_instance.put(`/post/${putId}`,updateData).then((res)=>{
            console.log("resUpdasted", res);
            setShowModal(false)
            getUserPost()
            alert("Your post has been updated")
        }).catch((err)=>{
            console.log(err,"errorUpdated");
        })
    };
    

    const delpost = async(i)=>{
        const find = data.find(li=> li._id === i)
        // console.log(find._id, "find")
        try {
            axios_instance.delete(`/post/${find._id}`)
            getUserPost()
            alert("Your post has Deleted")
        } catch (error) {
            console.log("error", error)
        }
    }
    const showModalclick = (i)=>{
        const find = data.find(li=> li._id === i)
        setShowModal(true)
        setPutId(find._id);
    }
// console.log(data)
// console.log(updateData,"data")
  return (
    <div className='bg-bg_color'>
        
    <Navbar_Component />
    <div className='px-3'>

               
              
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>


                {data.map((li,i)=>{
                    return(
                    <div key={i} className='rounded-md overflow-hidden  bg-white max-w-full h-full  mx-2 my-2'>
                        <div className='space-y-2 py-3'>
                            <div  className='px-3 flex items-center justify-between'>
                               
                        
                                <button onClick={() => showModalclick(li._id)}>Edit</button>
                                {showModal ? (
       
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    
                  <h3 className="text-3xl font=semibold">Edit Your Post</h3>
                  
                </div>
                  <form onSubmit={submit_post} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <div className="relative p-2 flex-auto">
                    <label className="block text-black text-sm font-bold mb-1">
                      Image Url
                    </label>
                    
                        
                    <Input_Field id='image_url' type='text' required={true} onChange={change_handle} placeholder='Enter image url'/>
                
                    <label className="block text-black text-sm font-bold mb-1">
                      Title
                    </label>
                    <Input_Field id='title' type='text' required={true} onChange={change_handle} placeholder='Enter title'/>
                    <label className="block text-black text-sm font-bold mb-1">
                      Description
                    </label>
                    <Input_Field id='description' type='text' required={true} onChange={change_handle} placeholder='Enter description'/>
                    <label className="block text-black text-sm font-bold mb-1">
                      Views
                    </label>
                    <Input_Field id='views' type='number' required={true} onChange={change_handle} placeholder='Enter views'/>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  
                    
                  >
                    Submit
                  </button>
                </div>
              </form>
              </div>

            </div>
          </div>
        
      ) : null}
                                <button onClick={()=> delpost(li._id)}>Delete</button>



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

export default UserPost