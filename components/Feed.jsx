"use client";

import { Suspense, useEffect,useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [currentSearch,setCurrentSearch] = useState("")
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    const query = e.target.value
    console.log("Querying",query)
    setCurrentSearch(query)
  }

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt',{
        method:"POST",
        body:JSON.stringify({
          currentSearch:currentSearch
        })
      });
      const data = await response.json();
      setPosts(data)
    }
    fetchPosts()
  },[currentSearch]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a prompt"
          value={currentSearch}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* <Suspense fallback={<p>Loading...</p>}> */}
        <PromptCardList
          data={posts}
          handleTagClick={(e)=>{
            setCurrentSearch(e)}}
        />
      {/* </Suspense> */}
    </section>
  )
}

export default Feed