"use client";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";
const page = ({params}) => {
   
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
  
        setPosts(data);
      };
     fetchPosts();
  }, []);
 


  return (
    <div>
        
        {posts?.length>0?
         <Profile
         name={posts?.[0]?.creator?.username}
         desc={"Welcome to the Prompt creator"}
         data={posts}
       />
        :
        <div >
            <div className="animate-pulse bg-gray-300 w-[350px] h-20"></div>
            <div className="animate-pulse bg-gray-300 w-[370px] h-10 mt-3"></div>
            <div  className="flex gap-3 justify-between items-center mt-12">
            <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>
            <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>
            <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>


            </div>
        </div>}
       
    </div>
  );
};

export default page;

