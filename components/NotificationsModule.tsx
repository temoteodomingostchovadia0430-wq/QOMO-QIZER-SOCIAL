
import React from 'react';
import NotificationCenter from './notifications/NotificationCenter';

const NotificationsModule: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <NotificationCenter />
    </div>
  );
};

export default NotificationsModule;
