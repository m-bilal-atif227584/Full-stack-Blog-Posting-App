import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config'
import { PostForm,Container } from '../Components/index';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

    const [post, setpost] = useState(null)
    const {slug} = useParams()
    //useParams() is used to take anything from url.{slug} is like a variable.
    const navigate = useNavigate()
    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setpost(post)
                }
            })
        } else{
            navigate('/')
        }
    },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost