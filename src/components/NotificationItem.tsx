import React from 'react';

interface NotificationItemProps {
  content: string;
  isRead: boolean;
  onClick: () => void;
  image: string; // 프로필 이미지
}

const NotificationItem: React.FC<NotificationItemProps> = React.memo(({ content, isRead, onClick, image }) => {
  return (
    <div
      onClick={onClick}
      className={`py-2.5 px-4 rounded-lg ${
        isRead ? 'bg-gray-200' : 'bg-[#AFE327]'
      } flex items-center cursor-pointer`}
    >
      <div className="mr-4">
        <img
          src={image || 'https://via.placeholder.com/40'} 
          alt="프로필 이미지"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <p>{content}</p>
    </div>
  );
});

export default NotificationItem;
