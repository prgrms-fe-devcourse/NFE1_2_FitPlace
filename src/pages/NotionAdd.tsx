import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import arrowforward from "../assets/arrowforward.svg";
import Button from "../components/Button";
import Header from "../components/Header";
import NotionCategory from "../components/NotionCategory";

interface FormData {
    title: string;
    image: File | null;
    channelId: string;
}

const INITIAL_FORM_STATE: FormData = {
    title: "",
    image: null,
    channelId: "",
};

const API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";

const NotionAdd: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, image: file }));
    }, []);

    // const handleCategorySelect = useCallback((category: string) => {
    //     setFormData((prev) => ({ ...prev, channel: category }));
    // }, []);

    const handleSubmit = async () => {
        const submitData = new FormData();
        submitData.append("title", formData.title);
        if (formData.image) {
            submitData.append("image", formData.image);
        }
        submitData.append("channelId", "66f61d8ae853893996dc7519");

        try {
            const response = await fetch(`${API_URL}/posts/create`, {
                method: "POST",
                headers: {
                    Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDE0ODU5fQ.Al40jxy-6yrAoANrY3fQA1joeNw08-fjByus_ZfxXSk`,
                },
                body: submitData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Post created successfully:", data);
            // 성공 후 처리 (예: 홈 페이지로 리다이렉트)
        } catch (error) {
            console.error(
                "Error creating post:",
                error instanceof Error ? error.message : String(error)
            );
            // 에러 처리
        }
    };

    // const renderInput = ({
    //     label,
    //     name,
    //     type = "text",
    //     placeholder,
    // }: RenderInputProps) => (
    //     <div>
    //         <label htmlFor={name} className="flex font-bold text-xl mt-6">
    //             {label}
    //         </label>
    //         <input
    //             type={type}
    //             id={name}
    //             name={name}
    //             value={formData[name]}
    //             onChange={handleChange}
    //             placeholder={placeholder}
    //             className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
    //         />
    //     </div>
    // );

    return (
        <>
            <Header />
            <div className="bg-white w-[640px] h-full">
                <form className="m-5">
                    <div>
                        <label
                            htmlFor="title"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 이름
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="모임 이름을 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5"
                        />
                    </div>
                    {/* {renderInput({
                        label: "모임 인원",
                        name: "meetingCapacity",
                        type: "number",
                        placeholder: "최대 참가 가능한 인원을 입력해주세요",
                    })} */}

                    {/* <div>
                        <h3 className="font-bold text-xl mt-6">운동 종목</h3>
                        <div className="mt-2.5">
                            <NotionCategory onSelect={handleCategorySelect} />
                        </div>
                    </div> */}

                    {/* <div>
                        <label
                            htmlFor="meetingDescription"
                            className="flex font-bold text-xl mt-6"
                        >
                            모임 설명
                        </label>
                        <textarea
                            id="meetingDescription"
                            name="meetingDescription"
                            value={formData.meetingDescription}
                            onChange={handleChange}
                            placeholder="모임에 대한 설명을 입력해주세요."
                            className="border-2 border-solid border-[#e8e8e8] w-[600px] h-32 mt-2.5 text-lg pl-2.5"
                        />
                    </div> */}

                    <div className="mb-6">
                        <p className="font-bold text-xl mt-6">사진 등록</p>
                        <label
                            htmlFor="image"
                            className="w-[160px] h-[140px] border-2 border-solid rounded text-[#A7E30A] text-xl flex justify-center items-center relative mt-2.5"
                        >
                            + 사진 업로드
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="absolute hidden"
                        />
                    </div>

                    <Button
                        label="모임 등록"
                        size="full"
                        color="green"
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </>
    );
};

export default NotionAdd;
