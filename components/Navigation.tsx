
import React from 'react';
import { Home, MessageCircle, Trophy, PlaySquare, UserCircle, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: AppTab.FEED, icon: Home, label: 'Feed' },
    { id: AppTab.MESSAGES, icon: MessageCircle, label: 'Chat' },
    { id: AppTab.SPORTS, icon: Trophy, label: 'Arena' },
    { id: AppTab.DRAMA_BOX, icon: PlaySquare, label: 'Dramas' },
    { id: AppTab.PROFILE, icon: UserCircle, label: 'Perfil' },
    { id: AppTab.SETTINGS, icon: Menu, label: 'Menu' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 glass px-2 py-1 flex justify-around items-center z-[110] sm:hidden h-14">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center transition-all px-1 py-1 flex-1 relative group`}
          >
            <motion.div
              animate={isActive ? { 
                scale: [1, 1.2, 1], 
                y: [0, -4, 0],
              } : { scale: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: "backOut"
              }}
              whileTap={{ scale: 0.85 }}
              className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-theme-primary/10 text-theme-primary' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            </motion.div>
            
            {isActive && (
              <motion.div 
                layoutId="nav-indicator-mobile" 
                className="absolute -top-1 w-8 h-1 rounded-full bg-theme-primary shadow-[0_0_10px_var(--theme-primary)]" 
              />
            )}
            
            <span className={`text-micro mt-0.5 truncate w-full text-center transition-colors ${isActive ? 'text-theme-primary' : 'text-slate-400'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
