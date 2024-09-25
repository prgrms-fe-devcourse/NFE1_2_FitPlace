import React from "react";
import SearchUser_item from "./SearchUser_item";

const SearchUser = () => {
    const userList = ["닉네임", "선영", "운동운덩", "나야나"];
    return (
        <div className="">
            <section>
                <p className="font-bold text-xl mb-4">사용자 검색 결과</p>
                <div className="flex flex-wrap -mx-2">
                    {userList.map((user, index) => (
                        <div key={index} className="w-1/3 px-2 mb-4">
                            <SearchUser_item user={user} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SearchUser;
