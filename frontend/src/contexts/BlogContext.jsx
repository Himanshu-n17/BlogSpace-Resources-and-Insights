import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
const BlogContext = createContext(undefined);
const blogReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "ADD_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, { posts: [] });

  // Fetching all the posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts");
      dispatch({ type: "SET_POSTS", payload: res.data });
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Add a new post
  const addPost = async (postData, token) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "ADD_POST", payload: res.data });
      return res.data;
    } catch (err) {
      console.error("Error adding post:", err);
      throw err;
    }
  };

  // Update the post
  const updatePost = async (postId, postData, token) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/posts/${postId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "UPDATE_POST", payload: res.data });
      return res.data;
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  };

  // Deleting the post
  const deletePost = async (postId, token) => {

    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "DELETE_POST", payload: postId });
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  };

  // Get posts by a specific user
  const getUserPosts = (userId) => {
    return state.posts.filter(
      (post) => post.author === userId || post.author._id === userId
    );
  };

  // Check if user can edit a post
  const canEditPost = (post, user) => {
    return post.author.email === user.email;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts: state.posts,
        addPost,
        updatePost,
        deletePost,
        getUserPosts,
        canEditPost,
        fetchPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
