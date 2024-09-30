import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Search_bar from "../components/Search_bar";
import SearchPost from "../components/SearchPost";
import SearchUser from "../components/SearchUser";
import Header from "../components/Header";
interface RawPost {
    likes: any[];
    comments: any[];
    _id: string;
    title: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface ParsedPost {
    _id: string;
    title: string;
    meetingCapacity: string;
    channel: string;
    author: string;
    createdAt: string;
}
const SearchPage = () => {
    const searchCategory = ["포스트", "사용자"];
    const [activeButton, setActiveButton] = useState(searchCategory[0]);
    const [posts, setPosts] = useState<ParsedPost[]>([]);
    const [inputValue, setInputValue] = useState('');
    const getValue = (newValue) => {
        setInputValue(newValue)
    }
    console.log(inputValue)

    const parsePost = (rawPost: RawPost): ParsedPost => {
        try {
            let parsedTitle;
            try {
                parsedTitle = JSON.parse(rawPost.title);
            } catch {
                // title이 이미 문자열인 경우
                parsedTitle = {
                    title: rawPost.title,
                    meetingCapacity: "",
                    channel: "",
                };
            }
            return {
                _id: rawPost._id,
                title: parsedTitle.title,
                meetingCapacity: parsedTitle.meetingCapacity,
                channel: parsedTitle.channel,
                author: rawPost.author,
                createdAt: rawPost.createdAt,
            };
        } catch (error) {
            console.error("Error parsing post:", error);
            return {
                _id: rawPost._id,
                title: rawPost.title,
                meetingCapacity: "",
                channel: "",
                author: rawPost.author,
                createdAt: rawPost.createdAt,
            };
        }
    };

    const selectCl = activeButton === "포스트" ? "all" : "users" 

    useEffect(() => {
        const fetchPosts = async (title) => {
            try {
                const API_URL =
                    "https://kdt.frontend.5th.programmers.co.kr:5009";

                const response = await 
               
                    fetch(`${API_URL}/search/${selectCl}/${title}`, {
                    headers: {
                        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs`,
                    },
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: RawPost[] = await response.json();
                const parsedPosts = data.map(parsePost);
                setPosts(parsedPosts);
                console.log(parsedPosts);
            } catch (error) {
                console.error("Error :", error);
            }
        };
        fetchPosts(inputValue);
    }, []);
    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };
    return (
        <>
            <Header />
            <div className="w-140 min-h-screen bg-white p-3">
                <section className="mb-10">
                    <Search_bar placeholder="검색어를 입력해주세요." getValue={getValue}/>
                </section>
                <div className="mb-4 flex">
                    {searchCategory.map((category, index) => (
                        <Button
                            key={index}
                            label={category}
                            color={activeButton === category ? "green" : "grey"}
                            size="mid"
                            margin="btnMr"
                            onClick={() => handleButtonClick(category)}
                        />
                    ))}
                </div>
                {activeButton === "포스트" ? <SearchPost postList={posts}/> : <SearchUser />}
            </div>
        </>
    );
};
export default SearchPage;