interface ProfileInfo {
  category: string
  description: string
}

const ProfileWrap = (props: ProfileInfo) => {
  return (
    <div className="py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow">
      <p className="font-bold text-base">{props.category}</p>
      {/* 디스크립션 일정, 후기나 차단유저목록은 string말고 다른거 받아와야할것같아요 */}
      <p className="font-medium text-base mt-4">{props.description}</p>
    </div>
  );
};

export default ProfileWrap;