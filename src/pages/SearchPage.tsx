import { useEffect, useState } from "react";
import SearchUser from "../components/SearchUser";
import SearchPost from "../components/SearchPost";
import Search_bar from "../components/Search_bar";
import Header from "../components/Header";
import Button from "../components/Button";
import Health_post from "../components/Health_post";
import { Link } from "react-router-dom";

interface Post {
    likes: any[];
    comments: any[];
    _id: string;
    image?: string;
    imagePublicId?: string;
    title: string;
    channel: any;
    author: any;
    createdAt: string;
    updatedAt: string;
}

interface ParsedPost {
    _id: string;
    title: string;
    currentMember: number;
    meetingCapacity: number;
    isTimeFlexible: boolean;
    meetingTime: string;
    meetingSpot: string;
    image?: string;
    imagePublicId?: string;
    author: any;
    createdAt: string;
    updatedAt: string;
    likes: any[];
    comments: any[];
}

type SearchResult = any | ParsedPost;

const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";

function parsePost(post: Post): ParsedPost {
    let parsedTitle: Partial<ParsedPost>;
    try {
        parsedTitle = JSON.parse(post.title);
    } catch (error) {
        console.error("Error parsing post title:", error);
        parsedTitle = {};
    }

    return {
        _id: post._id,
        title: parsedTitle.title || "",
        currentMember: parsedTitle.currentMember || 0,
        meetingCapacity: parsedTitle.meetingCapacity || 0,
        isTimeFlexible: parsedTitle.isTimeFlexible || false,
        meetingTime: parsedTitle.meetingTime || "",
        meetingSpot: parsedTitle.meetingSpot || "",
        image: post.image,
        imagePublicId: post.imagePublicId,
        author: post.author,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
        comments: post.comments,
    };
}

const SearchPage = () => {
    const searchCategory = ["포스트", "사용자"];
    const [activeButton, setActiveButton] = useState(searchCategory[0]);
    const [posts, setPosts] = useState<ParsedPost[]>([]);
    const [query, setQuery] = useState<string>(""); // query state
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getValue = (newValue: string) => {
        setQuery(newValue);
    };

    const selectCl = activeButton === "포스트" ? "all" : "users";

    const handleSearch = async () => {
        if (!query.trim()) return; // query가 공백이면 검색하지 않음

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_URL}/search/${selectCl}/${query}`,
                {
                    headers: {
                        Authorization:
                            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SearchResult[] = await response.json();
            const parsedResults = data.map((item) =>
                "email" in item ? item : parsePost(item as Post)
            );
            setResults(parsedResults); // 검색 결과 업데이트
            console.log(results);
            setPosts(results);
        } catch (error) {
            setError("Failed to fetch search results");
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };

    useEffect(() => {
        console.log("posts:", posts);
        console.log("results:", results);
    }, [results]);

    return (
        <>
            <Header />
            <div className="w-140 min-h-screen bg-white p-3">
                <section className="mb-10">
                    {" "}
                    <Search_bar
                        placeholder="검색어를 입력해주세요."
                        getValue={getValue} // getValue 함수 전달
                    />
                    <button onClick={handleSearch}>검색</button>
                    {/* 검색 버튼 클릭 시 handleSearch 실행 */}
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
                {activeButton === "포스트" ? (
                    <SearchPost postList={results} />
                ) : (
                    <SearchUser />
                )}
            </div>
        </>
    );
};

export default SearchPage;
