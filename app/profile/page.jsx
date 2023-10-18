"use client";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [isDelete, setIsDelete] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    setIsDelete(post);
    const response = await fetch(`/api/prompt/id?${post._id}`, {
      method: "DELETE",
    });
    if (response?.ok) router.push("/");
    setIsDelete(null);
  };

  return (
    <div>
      <Profile
        name={session?.user?.name}
        desc={"Welcome to the Prompt creator"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isDelete={isDelete}
      />
    </div>
  );
};

export default page;
