import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";
import "./profile.css";

const GET_PROFILE = gql`
  query GetProfile($email: String!){
    profile(email: $email) {
      bio
      isMyProfile
      user {
        name
        posts {
          id
          title
          content
          createdAt
          publishStatus
        }
      }
    }
  }
`;

export default function Profile() {
  const { email } = useParams();

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      email: email
    }
  });

  if(error) {
    console.log(error);
    return <div>Error Page</div>
  }

  if(loading) {
    return <div>Loading</div>
  }

  const {profile} = data;
  console.log(data);

  return (
    <div className="profile">
      <div className="userDetails">
        <div >
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {profile.user.posts.map((post, index) => {
          return <Post 
          key={index}
          id={post.id}
          title={post.title} 
          content={post.content} 
          date={post.createdAt} 
          user={profile.user} 
          published={post.publishStatus}
          isMyProfile={profile.isMyProfile}
          />
        })}
      </div>
    </div>
  );
}
