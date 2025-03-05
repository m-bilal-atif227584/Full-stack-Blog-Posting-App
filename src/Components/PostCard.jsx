import React from 'react';
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return(
    <Link to={`/post/${$id}`}>
        <div className='w-full h-[265px] bg-gray-300 shadow-2xl hover:bg-gray-500 duration-200 border-2 border-black rounded-xl p-4'>
            <div className="w-full justify-center mb-4">
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl object-cover w-full h-40' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard