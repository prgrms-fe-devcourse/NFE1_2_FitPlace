import { Link } from "react-router-dom";
import ProfileWrap from "../../components/ProfileWrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

interface LikeArr {
  _id: string
  user: string
  post: string
  createdAt: string
  updatedAt: string
  __v: number
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

interface UserData {
  fullName: string
  birth: number
  userId: string
  description: string
  location: string
  image: string[]
}

const ProfileTemplate = () => {

  const cookie = new Cookies();

  const [isMyProfile, setIsMyProfile] = useState(false);
  const [myToken, setMyToken] = useState();
  const [paramsId, setParamsId] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [likedPost, setLikedPost] = useState<LikeArr[]>([])
  const [postData, setPostData] = useState<PostArr[]>();
  const [profileData, setProfileData] = useState<UserData>({
    fullName: '',
    birth: 0,
    userId: '',
    description: '',
    location: '',
    image: []
  });
  const [likedData, setLikedData] = useState<string[] | null>([]);

  let { id } = useParams();

  useEffect(() => {
    const token = cookie.get("token").replace(/bearer\s+/g, "")
    setMyToken(token);
    const fetchData = async () => {
      try {
        const paramRes = await axios.get(`https://kdt.frontend.5th.programmers.co.kr:5009/users/${ id }`)
        setLikedPost(paramRes.data.likes)
        setParamsId(paramRes.data._id)

        if (paramRes.data.fullName === 'STYLED 관리자') {
          setProfileData(prev => ({
            ...prev,
            fullName: '관리자',
            birth: 20000101,
            location: '관리자',
            description: '관리자용 계정입니다',
            userId: '관리자',
            image: []
          }))
        } else {
          const profile = JSON.parse(paramRes.data.fullName)
          setProfileData(prev => ({
            ...prev,
            ...profile
          }))
        }

        const tokenRes = await axios.get('https://kdt.frontend.5th.programmers.co.kr:5009/auth-user', {
          headers: {
            Authorization: `bearer ${myToken}`
          }
        })
        setTokenId(tokenRes.data._id);

        if(paramsId === tokenId) {
          setIsMyProfile(true);
        } else {
          setIsMyProfile(false)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if(token) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    if(paramsId === tokenId) {
      setIsMyProfile(true)
    } else {
      setIsMyProfile(false)
    }
    initializePost()
  }, [paramsId, tokenId])

  const initializePost = () => {
    likedPost.forEach(item => {
      if('post' in item) {
        axios.get(`https://kdt.frontend.5th.programmers.co.kr:5009/post/${item.post}`)
        .then(res => {
          const data: TitleParse = JSON.parse(res.data.title);
          const id = res.data._id;
          
          if(item.post === id) {
            const updateItems = (prev: string[] | null): string[] | null => {
              if(prev) {
                return [...prev, data.title]
              } else {
                return [data.title]
              }
            }
            setLikedData(updateItems)
          }
        })
      } else {
        setLikedData(null)
      }
    })
    // if (Array.isArray(likedPost)) {
    //   const evenData: PostArr[] = [];
    //   likedPost.map((post, idx) => {
    //     const matchedData = postData?.find(item => item._id === post.post);
    //     if(typeof matchedData === 'object') {
    //       evenData.push(matchedData)
    //       console.log(evenData)
    //     }
    //   })
    //   const set = new Set(evenData)
    //   const arr = [...set];
    //   arr.map((item, idx) => {
    //     return setLikedData(JSON.parse(item.title))
    //   })
    // }
  }

  return (
    <div className="w-140 min-h-screen bg-white p-3">
      <Link to={'/profile/edit'}>임시리동</Link>
      <div className="flex flex-col justify-center items-stretch">
        {/* 프로필 상단 정보 영역 */}
        <div className="flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
          {/* 프로필 이미지 */}
          <div id="profileImg" className="mx-auto w-24 h-24 overflow-hidden rounded-lg">
            {
              profileData.image.length !== 0
              ? <img
                  src={ profileData.image[0] }
                  alt={`${profileData?.fullName}님의 프로필 사진`}
                  className="object-cover w-full h-full"
                />
              : <img
                  src="/src/assets/defaultProfileImg.svg"
                  alt={`${profileData?.fullName}님의 프로필 사진`}
                  className="object-cover w-full h-full"
                />
            }
          </div>

          {/* 닉네임 */}
          <div className="mt-2">
            <p className="text-3xl font-bold">{
            !profileData.fullName || profileData.fullName === ''
            ? "닉네임"
            : profileData?.fullName
            }</p>
          </div>

          {/* 운동완료 횟수 */}
          <div className="mt-6">
            <p className="text-base font-normal">
              <span className="font-bold">0</span>회 오늘의 같이 운동 완료!
            </p>
          </div>
        </div>

        {/* 하단 기타 정보들 래퍼 */}
        <div className="profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6">
          
          {/* 소개글 */}
          <ProfileWrap
            category="소개글"
            description={ !profileData?.description ? "아직 작성하지 않았어요" : profileData.description }
          />

          {/* 지역 */}
          <ProfileWrap category="지역" description={ !profileData?.location ? "아직 작성하지 않았어요" : profileData.location } />

          {/* 좋아요를 누른 게시물 */}
          <div className="py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
            <p className="font-bold text-base">좋아요를 누른 게시물</p>
            {
              likedData === null
              ? <p className="font-medium text-base mt-4">좋아요를 누른 게시물이 없습니다</p>
              : <p className="font-medium text-base mt-4">있쪄</p>
            }
          </div>

          { /* 오늘의 일정
          <ProfileWrap
            category="오늘의 일정"
            description={ !profileData?.description ? "오늘 할 일정이 없어요" : "profileData.location" }
          />

          후기
          <ProfileWrap category="후기" description={ !profileData?.description ? "아직 작성된 후기가 없어요" : "대충 있을때 이거넣을듯" } /> */}

          {
            isMyProfile
            ?
            // 차단 유저 목록
            <ProfileWrap category="차단유저 목록" description="대충 있을때 이거넣을듯" />
            : null
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
