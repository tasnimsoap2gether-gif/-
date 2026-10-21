import React from 'react';
import { Sparkles, Volume2, VolumeX, Award, BookOpen, PenTool, LayoutGrid, Gamepad2, Keyboard, Brain, Bot, Users, BookMarked, Layers } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type ActiveTab = 'home' | 'storybook' | 'tracing' | 'comic' | 'morphology' | 'braingames' | 'catch' | 'sentence' | 'typing';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  onOpenTrophies: () => void;
  onOpenPersonalityTest: () => void;
  onOpenFriendsClub: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stars,
  onOpenTrophies,
  onOpenPersonalityTest,
  onOpenFriendsClub,
  isMuted,
  setIsMuted,
}) => {
  const toggleSound = () => {
    const newState = soundManager.toggleMute();
    setIsMuted(newState);
    if (!newState) {
      soundManager.playPop();
    }
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'الحديقة التفاعلية', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'storybook', label: 'القصص المتحركة', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'tracing', label: 'كراسة الخط والرسم', icon: <PenTool className="w-4 h-4" /> },
    { id: 'comic', label: 'استوديو الكوميكس', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'morphology', label: 'مختبر الكلمات والحروف', icon: <Layers className="w-4 h-4" /> },
    { id: 'braingames', label: 'ألعاب الذكاء والألغاز', icon: <Brain className="w-4 h-4" /> },
    { id: 'catch', label: 'صائد الكلمات', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'sentence', label: 'مختبر الجمل', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'typing', label: 'بطل الكيبورد', icon: <Keyboard className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('home');
          }}
          className="flex items-center gap-2.5 text-right cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl">✏️</span>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 block leading-tight font-sans">
              عالم الكتّاب الصغار
            </span>
            <span className="text-xs text-amber-600 font-medium hidden sm:block">
              Little Writers & Artists
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-50/70 rounded-2xl border border-amber-200/60">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs scale-102'
                    : 'text-slate-600 hover:text-amber-700 hover:bg-amber-100/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Personality Test Button */}
          <button
            onClick={() => {
              soundManager.playSparkle();
              onOpenPersonalityTest();
            }}
            title="تحليل شخصيتي وميولي"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-sky-600" />
            <span className="hidden md:inline">مختبر شخصيتي</span>
          </button>

          {/* Friends Club Button */}
          <button
            onClick={() => {
              soundManager.playHighFive();
              onOpenFriendsClub();
            }}
            title="نادي الأصدقاء والتعارف"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-pink-600" />
            <span className="hidden md:inline">الأصدقاء</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          {/* Stars & Trophy Button */}
          <button
            onClick={() => {
              soundManager.playFanfare();
              onOpenTrophies();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-linear-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer transform hover:scale-103"
          >
            <span className="text-base animate-bounce">⭐</span>
            <span className="tabular-nums font-extrabold">{stars}</span>
            <Award className="w-4 h-4 text-amber-900 hidden sm:inline" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Scrollbar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-3 py-2 border-t border-amber-100 bg-amber-50/50 no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(item.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 bg-white border border-amber-200'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
