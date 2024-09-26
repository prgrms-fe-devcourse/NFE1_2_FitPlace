import React from "react";
import iconUser from "../assets/defaultProfileImg.svg";

interface CommentProps {
    item: {
        comment: string;
        author: {
            fullName?: string; // optional로 변경
        };
        post: string;
    };
}
const CommentItem = ({ item }: CommentProps): JSX.Element => {
    return (
        <div className="flex items-center w-full">
            <div className="w-10 mr-4">
                <img
                    src={iconUser}
                    alt="search-icon"
                    className="w-full h-full object-cover rounded-full overflow-hidden"
                />
            </div>
            <div className="">
                <div className="text-sm mb-2">{item.author.fullName}</div>
                <div className="text-base">{item.comment}</div>
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
