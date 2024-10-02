import { useEffect, useState } from "react";
import Search_bar from "../components/Search_bar";
import SearchPost from "../components/SearchPost";
import SearchUser from "../components/SearchUser";
import Header from "../components/Header";
import Button from "../components/Button";
import Health_post from "../components/Health_post";
import axios from "axios";
interface Post {
    likes: any[];
    comments: any[];
    _id: string;
    image?: string;
    imagePublicId?: string;
    title: string;
    channel: any;
    name: string;
    meetingCapacity: number;
    author: any;
    createdAt: string;
    updatedAt: string;
}
interface ParsedPost {
    _id: string;
    title: string;
    name: string;
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
    let parsedTitle: Partial<ParsedPost> = {};

    if (post.title && post.title.startsWith("{") && post.title.endsWith("}")) {
        try {
            parsedTitle = JSON.parse(post.title);
        } catch (error) {
            console.error("Error parsing post title:", error);
            // JSON 파싱에 실패했을 때 parsedTitle은 빈 객체로 유지
            parsedTitle = {};
        }
    }

    console.log("서치 채널 모임인원: ", parsedTitle.meetingCapacity);

    return {
        _id: post._id,
        title: parsedTitle.title || post.title || "", // JSON 파싱 실패 시 post.title 사용
        name: parsedTitle.name || "",
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
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const searchCategory = ["포스트", "사용자"];
    const [activeButton, setActiveButton] = useState(searchCategory[0]);
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState([]);
    const [channel, setChannel] = useState([]);
    const [enter, setEnter] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const getValue = (newValue) => {
        setQuery(newValue);
    };

    const selectCl = activeButton === "포스트" ? "all" : "users";

    const KeyDown = async (e) => {
        if (e.key === "Enter") {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${API_URL}/search/${selectCl}/${encodeURIComponent(query)}`,
                    {
                        headers: {
                            Authorization:
                                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs",
                        },
                    }
                );

                // if (!response.ok) {
                //     throw new Error(HTTP error! status: ${response.status});
                // }
                const data: SearchResult[] = await response.data;
                const parsedResults = data.map((item) =>
                    "email" in item ? item : parsePost(item as Post)
                );
                setResults(parsedResults);
            } catch (error) {
                setError("Failed to fetch search results");
                console.error("Error searching:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `${API_URL}/search/${selectCl}/${encodeURIComponent(query)}`,
                {
                    headers: {
                        Authorization:
                            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs",
                    },
                }
            );

            // if (!response.ok) {
            //     throw new Error(HTTP error! status: ${response.status});
            // }
            const data: SearchResult[] = await response.data;
            const parsedResults = data.map((item) =>
                "email" in item ? item : parsePost(item as Post)
            );
            setResults(parsedResults);
            console.log(parsedResults);
        } catch (error) {
            setError("Failed to fetch search results");
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };
    // const renderSearchResult = (result: SearchResult) => {
    //     // This is a ParsedPost
    //     return (
    //         <div key={result._id} className="post-result">
    //             <h3>{result.title}</h3>
    //             <p>Channel: {result.channel}</p>
    //             <p>
    //                 Members: {result.currentMember} / {result.meetingCapacity}
    //             </p>
    //             <p>Date: {result.meetingDate}</p>
    //             <p>
    //                 Time:{" "}
    //                 {result.isTimeFlexible
    //                     ? "Flexible"
    //                     : `${result.meetingStartTime} - ${result.meetingEndTime}`}
    //             </p>
    //             <p>Location: {result.meetingSpot}</p>
    //         </div>
    //     );
    // };

    const handleButtonClick = (item: string) => {
        setActiveButton(item);
    };

    useEffect(() => {}, [results]);

    console.log("searchPage:", results);

    return (
        <>
            <Header />
            <div className="w-140 min-h-screen bg-white p-3">
                <section className="mb-10 flex relative">
                    <Search_bar
                        value={query}
                        getValue={getValue}
                        handleKeydown={KeyDown}
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="p-2 absolute right-3 text-[#666666]"
                    >
                        Search
                    </button>
                </section>

                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

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
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}

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
