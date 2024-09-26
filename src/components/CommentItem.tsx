import React from "react";
import iconUser from "../assets/defaultProfileImg.svg";

const CommentItem = () => {
    return (
        <div>
            {" "}
            <div className="mb-6 w-10 rounded-full overflow-hidden ">
                <img
                    src={iconUser}
                    alt="search-icon"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default CommentItem;

/*
Comment 모델
{
  "_id": String,
  "comment": String,
  "author": User,
  "post": String, // 포스트 id
  "createdAt": String,
  "updatedAt": String
}
  */
