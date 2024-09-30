import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationItem from '../components/NotificationItem'; // NotificationItem 컴포넌트 임포트

interface Notification {
  id: number;
  content: string;
  isRead: boolean;
}

const NotificationPage = () => {
  const navigate = useNavigate(); 
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, content: 'sdfsfs님이 댓글을 남겼습니다.', isRead: false },
    { id: 2, content: 'sdfsfs님이 댓글을 남겼습니다.', isRead: false },
    { id: 3, content: 'sdfsfs님이 댓글을 남겼습니다.', isRead: true },
    { id: 4, content: 'sdfsfs님이 댓글을 남겼습니다.', isRead: true },
  ]);

  const hasNotifications = notifications.length > 0;

  // 개별 읽기
  const markAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // 전체 읽기 
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  return (
    <div className="w-140 mx-auto bg-white" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
      <div className="pt-5 px-4 pb-2 relative flex items-center justify-between">
        {/* SVG 아이콘 (뒤로가기) */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/>
            </svg>
        </div>

        <h2 className="text-xl font-bold text-center flex-1">알림</h2>

        {hasNotifications && (
          <button
            onClick={markAllAsRead} 
            className="text-gray-500 text-sm absolute right-8 top-[60%] transform -translate-y-1/2"
          >
            전체 읽음
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-gray-500">알림이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                content={notification.content}
                isRead={notification.isRead}
                onClick={() => markAsRead(notification.id)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
