
export type NotificationType = 
  | 'messages' 
  | 'mentions' 
  | 'payments' 
  | 'security' 
  | 'system'
  | 'like'
  | 'comment'
  | 'follow'
  | 'reward'
  | 'visit'
  | 'marketplace'
  | 'event';

interface NotificationPreferences {
  messages: boolean;
  mentions: boolean;
  payments: boolean;
  security: boolean;
  system: boolean;
  like: boolean;
  comment: boolean;
  follow: boolean;
  reward: boolean;
  visit: boolean;
  marketplace: boolean;
  event: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  messages: true,
  mentions: true,
  payments: true,
  security: true,
  system: true,
  like: true,
  comment: true,
  follow: true,
  reward: true,
  visit: true,
  marketplace: true,
  event: true,
};

class NotificationService {
  private preferences: NotificationPreferences;

  constructor() {
    const saved = localStorage.getItem('nexus_notification_prefs');
    this.preferences = saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('Este browser não suporta notificações desktop');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    return await Notification.requestPermission();
  }

  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  updatePreference(type: NotificationType, value: boolean) {
    this.preferences[type] = value;
    localStorage.setItem('nexus_notification_prefs', JSON.stringify(this.preferences));
  }

  async notify(title: string, options: NotificationOptions & { type: NotificationType }) {
    const { type, ...rest } = options;

    // Check user preference
    if (!this.preferences[type]) return;

    // Check browser permission
    if (Notification.permission !== 'granted') {
      const permission = await this.requestPermission();
      if (permission !== 'granted') return;
    }

    // Show notification
    try {
      new Notification(title, {
        icon: '/favicon.ico', // Fallback icon
        badge: '/favicon.ico',
        ...rest,
      });
    } catch (error) {
      console.error('Erro ao mostrar notificação:', error);
    }
  }
}

export const notificationService = new NotificationService();
