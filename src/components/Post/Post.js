import React from "react";
import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
  postPublish(postId: $postId) {
     userErrors {
       message
     }
     post {
       title
       content
     }
  }
}
`;

const UNPUBLISH_POST = gql`
  mutation unpublishPost($postId: ID!) {
  postUnpublish(postId: $postId) {
    userErrors {
      message
    }
    post {
      id
      content
      title
      createdAt
      publishStatus
    }
  }
}
`;

export default function Post({ title, content, date, user, published, id, isMyProfile }) {
    const [publishPost] = useMutation(PUBLISH_POST);
    const [unpublishPost] = useMutation(UNPUBLISH_POST);

    const formatedDate = new Date(Number(date));
    
    return (
      <div
        className="Post"
        style={published === false ? { backgroundColor: "rgb(216, 224, 231)" } : {}}
      >
        {isMyProfile && published === false && (
          <p className="Post__publish" onClick={() => {
            publishPost({
              variables: {
                postId: id,
              }
            });
          }}>
            Publish
          </p>
        )}
        {isMyProfile && published === true && (
          <p className="Post__publish" onClick={() => {
            unpublishPost({
              variables: {
                postId: id
              }
            });
          }}>
            Unpublish
          </p>
        )}
        <div className="Post__header-container">
          <h2>{title}</h2>
          <h4>
            Created At {`${formatedDate}`.split(" ").splice(0, 4).join(" ")} by{" "}
            {user.name}
          </h4>
        </div>
        <p>{content}</p>
      </div>
    );
}
