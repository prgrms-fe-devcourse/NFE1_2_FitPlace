import React, { useState } from "react";
import KakaoMap from './KakaoMap'; // KakaoMap 컴포넌트 임포트 관련 코드

const App = () => {
  const [abc, setAbc] = useState();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* 로그인 폼 */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-4">로그인</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              로그인
            </button>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </form>
      </div>

      
      {/* Kakao 지도 관련 */}
      <div className="w-full flex justify-center">
        <KakaoMap />
      </div>
    </div>
  );
};

export default App;
