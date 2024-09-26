import React from "react";
import CommentItem from "../components/CommentItem";
import Header from "../components/Header";

const CommentPage = () => {
    return (
        <>
            <div className="bg-white w-140 p-3">
                <div className="flex justify-between">ggg</div>
            </div>
            <div className="w-140 min-h-screen bg-white p-3">
                <div>모집마감</div>
                <div>풋살 4 vs 4 모집 ⚽</div>
                <div>풋살⚽</div>
                <div className="bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col transition-transform duration-300 ease-in-out hover:bg-gray-200  hover:shadow-xl">
                    <CommentItem />
                </div>
            </div>
        </>
    );
};

export default CommentPage;
