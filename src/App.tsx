import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { InteractiveGarden } from './components/InteractiveGarden';
import { LetterTracingCanvas } from './components/LetterTracingCanvas';
import { ComicStudio } from './components/ComicStudio';
import { BrainGames } from './components/BrainGames';
import { WordCatchGame } from './components/WordCatchGame';
import { SentenceBuilder } from './components/SentenceBuilder';
import { TypingHero } from './components/TypingHero';
import { AnimatedStorybook } from './components/AnimatedStorybook';
import { WordMorphologyLab } from './components/WordMorphologyLab';
import { TrophyRoomModal } from './components/TrophyRoomModal';
import { PersonalityAnalyzerModal } from './components/PersonalityAnalyzerModal';
import { FriendsGardenModal } from './components/FriendsGardenModal';
import { soundManager } from './utils/audio';
import { Award, Bot, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('khattati_stars');
    return saved ? parseInt(saved, 10) : 15; // 15 welcome stars
  });

  const [childName, setChildName] = useState<string>(() => {
    const saved = localStorage.getItem('khattati_child_name');
    return saved || 'البطل المبدع';
  });

  const [completedLetters, setCompletedLetters] = useState<string[]>(() => {
    const saved = localStorage.getItem('khattati_letters');
    return saved ? JSON.parse(saved) : ['أ'];
  });

  const [completedStoriesCount, setCompletedStoriesCount] = useState<number>(() => {
    const saved = localStorage.getItem('khattati_stories');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [isMuted, setIsMuted] = useState(false);
  const [isTrophiesOpen, setIsTrophiesOpen] = useState(false);
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('khattati_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('khattati_child_name', childName);
  }, [childName]);

  useEffect(() => {
    localStorage.setItem('khattati_letters', JSON.stringify(completedLetters));
  }, [completedLetters]);

  useEffect(() => {
    localStorage.setItem('khattati_stories', completedStoriesCount.toString());
  }, [completedStoriesCount]);

  const handleAwardStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  const handleLetterCompleted = (char: string) => {
    if (!completedLetters.includes(char)) {
      setCompletedLetters((prev) => [...prev, char]);
    }
  };

  const handleStoryCompleted = () => {
    setCompletedStoriesCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stars={stars}
        onOpenTrophies={() => setIsTrophiesOpen(true)}
        onOpenPersonalityTest={() => setIsPersonalityModalOpen(true)}
        onOpenFriendsClub={() => setIsFriendsModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'home' && (
          <InteractiveGarden
            setActiveTab={setActiveTab}
            stars={stars}
            childName={childName}
            setChildName={setChildName}
            onOpenPersonalityTest={() => setIsPersonalityModalOpen(true)}
            onOpenFriendsClub={() => setIsFriendsModalOpen(true)}
            onOpenTrophies={() => setIsTrophiesOpen(true)}
          />
        )}

        {activeTab === 'storybook' && (
          <AnimatedStorybook onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'morphology' && (
          <WordMorphologyLab onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'tracing' && (
          <LetterTracingCanvas
            onAwardStars={handleAwardStars}
            onLetterCompleted={handleLetterCompleted}
            completedLetters={completedLetters}
          />
        )}

        {activeTab === 'comic' && (
          <ComicStudio
            onAwardStars={handleAwardStars}
            onStoryCompleted={handleStoryCompleted}
          />
        )}

        {activeTab === 'braingames' && (
          <BrainGames onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'catch' && (
          <WordCatchGame onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'sentence' && (
          <SentenceBuilder onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'typing' && (
          <TypingHero onAwardStars={handleAwardStars} />
        )}
      </main>

      {/* Personality & Talent Analyzer Modal */}
      <PersonalityAnalyzerModal
        isOpen={isPersonalityModalOpen}
        onClose={() => setIsPersonalityModalOpen(false)}
        onAwardStars={handleAwardStars}
        onSelectStation={(station) => setActiveTab(station)}
        childName={childName}
      />

      {/* Friends & Social Club Modal */}
      <FriendsGardenModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        onAwardStars={handleAwardStars}
        childName={childName}
      />

      {/* Trophy & Certificate Modal */}
      <TrophyRoomModal
        isOpen={isTrophiesOpen}
        onClose={() => setIsTrophiesOpen(false)}
        stars={stars}
        completedLettersCount={completedLetters.length}
        completedStoriesCount={completedStoriesCount}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-amber-100 py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-bold text-slate-700">حديقة الكتّاب والأصدقاء الساحرة</span>
            <span>·</span>
            <span>بيئة تفاعلية ترفيهية متكاملة لتعليم مهارات الكتابة، الفنون، وألعاب الذكاء</span>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <button
              onClick={() => {
                soundManager.playClick();
                setIsPersonalityModalOpen(true);
              }}
              className="text-sky-600 hover:text-sky-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>مختبر الشخصية</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsFriendsModalOpen(true);
              }}
              className="text-pink-600 hover:text-pink-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5" />
              <span>نادي الأصدقاء</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsTrophiesOpen(true);
              }}
              className="text-amber-600 hover:text-amber-700 font-bold transition-colors cursor-pointer flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>الأوسمة</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
