import React, {useState, useEffect} from 'react';
import appwriteService from '../appwrite/config'
import { PostCard,Container } from '../Components/index';

function AllPosts() {

    const [posts, setposts] = useState([])
    useEffect(() => {},[])
    appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setposts(posts.documents)
        }
    })
    
  return(
       <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostCard {...post} key={post.$id} />
                    ))}
                </div>
            </Container>
        </div>
  )
}

export default AllPosts