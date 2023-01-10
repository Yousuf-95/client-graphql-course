import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
  query GetProfile($email: String!){
    profile(email: $email) {
      bio
      isMyProfile
      user {
        name
        posts {
          title
          content
          createdAt
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

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{profile.isMyProfile ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {profile.user.posts.map((post, index) => {
          return <Post key={index} title={post.title} content={post.content} date={post.createdAt} user={profile.user} />
        })}
      </div>
    </div>
  );
}
