import React,{ useState,useEffect } from 'react';
import appwriteService from '../appwrite/config'
import { PostCard,Container } from '../Components/index';

function Home() {

    const [posts, setposts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setposts(posts.documents)
            }
        })
    },[])

    if(posts.length === 0){
        return(
            <div className="h-[303px] w-full py-8 mt-4 text-center">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home