import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationItem from '../components/NotificationItem';
import { useSelector } from 'react-redux'; 

interface Notification {
  _id: string;
  seen: boolean;
  author: {
    image: string;
    fullName: string;
  };
  comment?: {
    comment: string;
  };
  follow?: string;
  message?: string;
  post?: string;
  createdAt: string;
}

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Redux에서 토큰 가져오기
  const token = useSelector((state: any) => state.userToken);

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://kdt.frontend.5th.programmers.co.kr:5005/notifications',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data); 
      } else {
        console.error('알림 목록을 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('알림 목록을 가져오는 중 오류가 발생했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  // 전체 읽기
  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        'https://kdt.frontend.5th.programmers.co.kr:5005/notifications/seen',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => ({
            ...notification,
            seen: true,
          }))
        );
      } else {
        console.error('모든 알림을 읽음 처리하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('모든 알림을 읽음 처리하는 중 오류가 발생했습니다.', error);
    }
  };

  const getNotificationContent = (notification: Notification) => {
    if (notification.comment) {
      return `${notification.author.fullName}님이 새 댓글을 달았습니다: ${notification.comment.comment}`;
    }
    if (notification.follow) {
      return `${notification.author.fullName}님이 당신을 팔로우했습니다.`;
    }
    if (notification.post) {
      return `${notification.author.fullName}님이 게시글에 좋아요를 눌렀습니다.`;
    }
    if (notification.message) {
      return `${notification.author.fullName}님이 메시지를 보냈습니다: ${notification.message}`;
    }
    return `${notification.author.fullName}님이 알림을 보냈습니다.`;
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  const hasNotifications = notifications.length > 0;

  return (
    <div
      className="w-140 mx-auto bg-white"
      style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
    >
      <div className="pt-5 px-4 pb-2 relative flex items-center justify-between">
        {/* SVG 아이콘 */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-center flex-1">알림</h2>

        {hasNotifications && (
          <button
            onClick={markAllAsRead} 
            className="text-gray-500 text-sm absolute right-8 top-[60%] transform -translate-y-1/2"
          >
            알림 읽기
          </button>
        )}
      </div>

      {/* 알림 목록 */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-gray-500">알림이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                content={getNotificationContent(notification)} 
                isRead={notification.seen} 
                image={notification.author.image} 
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
