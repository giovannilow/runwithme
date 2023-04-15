// import useContext to get shared data.

import { useAuth } from "@/contexts/AuthContext";
// import custom components.
import Post from "./Post";

function Posts() {
  const { wallPosts } = useAuth();
  console.log(wallPosts);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {wallPosts.map((post) => (
        <Post
          key={post.id}
          createdBy={post.createdBy}
          message={post.message}
          timestamp={post.timestamp}
          imageUrl={post.imageUrl}
          userAvatar={post.userAvatar}
          likes={post.likes}
          postId={post.id}
        />
      ))}
    </div>
  );
}

export default Posts;
