import React from 'react'

export default function Posts() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchPosts = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await response.json();
          setPosts(data);
          setLoading(false);
        } catch (e) {
          setError(e.message);
          setLoading(false);
        }
      };
  return (
    <div>Posts</div>
  )
}
