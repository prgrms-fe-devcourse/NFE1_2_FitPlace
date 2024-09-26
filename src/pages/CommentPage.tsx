import React from "react";
import CommentItem from "../components/CommentItem";

// Comment 타입 정의
interface Comment {
    comment: string;
    author: {
        fullName?: string; // optional로 변경
    };
    post: string;
}
const CommentPage = (): JSX.Element => {
    const commentList: Comment[] = [
        {
            comment: "댓글댓글11111111111",
            author: {
                // 실제 데이터는 User가 옵니다.
                fullName: "선영",
            },
            post: "postid111", // 포스트 id
        },
        {
            comment: "댓글댓글222222222222",
            author: {
                fullName: "닉네임",
            },
            post: "postid111", // 포스트 id
        },
        {
            comment: "댓글댓글333333333333",
            author: {
                fullName: "선영",
            },
            post: "postid333", // 포스트 id
        },
    ];
    return (
        <>
            <div className="bg-white w-140 p-3">
                <div className="flex justify-between ">ggg</div>
            </div>
            <div className="w-140 min-h-screen bg-white p-3">
                <div className="text-sm text-gray-400 mb-1">모집마감</div>
                <div className="text-xl font-bold mb-4">
                    풋살 4 vs 4 모집 ⚽
                </div>
                <div className="text-sm text-gray-600 mb-4">풋살⚽</div>
                {commentList.map((item) => (
                    <div className="bg-gray-100 w-full  rounded-md shadow-lg mb-5 p-4 flex flex-col">
                        <CommentItem item={item} />
                    </div>
                ))}
                <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 left-0 right-0">
                    <div className="flex max-w-140 mx-auto">
                        <input
                            type="text"
                            placeholder="댓글을 입력하세요"
                            className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentPage;
