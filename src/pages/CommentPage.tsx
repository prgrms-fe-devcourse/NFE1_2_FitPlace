import React from "react";
import CommentItem from "../components/CommentItem";
import Button from "../components/Button";

// Comment 타입 정의
interface Comment {
    comment: string;
    author: {
        fullName?: string;
    };
    post: string;
}
const CommentPage = (): JSX.Element => {
    const commentList: Comment[] = [
        {
            comment: "댓글댓글11111111111",
            author: {
                // 실제 데이터는 User
                fullName: "선영",
            },
            post: "postid111", // 포스트 id
        },
        {
            comment: "댓글댓글222222222222",
            author: {
                fullName: "닉네임",
            },
            post: "postid111",
        },
        {
            comment: "댓글댓글333333333333",
            author: {
                fullName: "선영",
            },
            post: "postid111",
        },
    ];

    return (
        <>
            <div className="relative bg-white w-140 mx-auto min-h-screen flex flex-col">
                <div className="flex-grow p-3">
                    <div className="text-sm text-gray-400 mb-1">모집중!</div>
                    <div className="text-xl font-bold mb-4">
                        풋살 4 vs 4 모집 ⚽
                    </div>
                    <div className="text-sm text-gray-600 mb-8">풋살⚽</div>
                    {commentList.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-100 w-full  rounded-md shadow-lg mb-5 p-4 flex flex-col"
                        >
                            <CommentItem item={item} />
                        </div>
                    ))}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
                        <div className="flex w-full">
                            <textarea
                                placeholder="댓글을 입력하세요"
                                className="flex-1 border rounded-[4px] mr-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                            />
                            <Button label="등록" size="small" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentPage;
