"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const PromptCartList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt?._id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);
  const searchPost=posts?.filter(
    (item) => item.prompt.toLowerCase().includes(searchText?.toLowerCase())  || item?.tag?.toLowerCase().includes(searchText?.toLocaleLowerCase()) || item?.creator?.username?.toLowerCase().includes(searchText?.toLocaleLowerCase())  )
 
 
  return (
    <section className="feed">
      <form className="w-full relative flex-center ">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        {searchText && (
          <button
            className="absolute right-1 text-red-500"
            onClick={()=>setSearchText('')}
            aria-label="Clear Search"
          >
            X
          </button>
        )}
      </form>
      {posts?.length>0?
      <PromptCartList  data={searchText && searchPost?searchPost:posts} handleTagClick={setSearchText} />
    :  <div  className="flex gap-3 justify-between items-center mt-12">
    <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>
    <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>
    <div className="animate-pulse bg-gray-300 w-[350px] h-[30vh]"></div>


    </div>}
    </section>
  );
};

export default Feed;
