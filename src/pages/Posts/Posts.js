import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";
import Error from "../../components/Error/Error";
import "./posts.css";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`

export default function Posts() {

  const {data, error, loading} = useQuery(GET_POSTS);

  if(error) {
    return <Error errorMessage={error.message}/>
  }
  else {
    
  if(loading) {
     return <div>Loading</div>
  }

  const { posts } = data;

  return <div className="posts">
    {posts.map((post) => {
      return <Post key={post.id} title={post.title} content={post.content} date={post.createdAt} id={post.id} user={post.user.name} />
    })}
  </div>;

  }
}
