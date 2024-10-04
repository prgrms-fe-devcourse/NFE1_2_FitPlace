import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProfileInfo {
  category: string
  description: string | object
  postData?: PostArr[]
}
interface PostArr {
  likes: []
  comments: []
  _id: string
  title: string
  channel: unknown
  author: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface TitleParse {
  title: string
  meetingCapacity: number
  currentmember: string[]
  channel: string
  meetingSpot: string
  image: string[]
}

const ProfileWrap = (props: ProfileInfo) => {

  const [posts, setPosts] = useState(props.postData)

  const render = () => {
    if(typeof props.description === 'string') {
      return (<p className="font-medium text-base mt-4">{props.description}</p>)
    }
  }

  return (
    <div className="py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
      <p className="font-bold text-base">{props.category}</p>
      {/* 디스크립션 일정, 후기나 차단유저목록은 string말고 다른거 받아와야할것같아요 */}
      {
        <>
          {render()}
        </>
      }
    </div>
  );
};

export default ProfileWrap;