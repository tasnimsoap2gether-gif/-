import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { ANIMATED_STORIES, StoryPage, StoryHotspot } from '../data/storybookData';
import { soundManager } from '../utils/audio';
import { Volume2, Sparkles, ChevronRight, ChevronLeft, Bookmark, Heart, Award, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AnimatedStorybookProps {
  onAwardStars: (amount: number) => void;
}

export const AnimatedStorybook: React.FC<AnimatedStorybookProps> = ({ onAwardStars }) => {
  const currentStory = ANIMATED_STORIES[0];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<StoryHotspot | null>(null);

  // Karaoke narration word-by-word state
  const [isNarrating, setIsNarrating] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);

  // Interactive challenge choice state
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);

  const currentPage: StoryPage = currentStory.pages[currentPageIndex] || currentStory.pages[0];

  // Stop narration when changing page
  useEffect(() => {
    setIsNarrating(false);
    setActiveWordIndex(-1);
    setActiveHotspot(null);
    setSelectedChoiceIndex(null);
  }, [currentPageIndex]);

  // Read whole page with synchronized word-by-word highlighting
  const handleReadPage = () => {
    if (isNarrating) {
      window.speechSynthesis?.cancel();
      setIsNarrating(false);
      setActiveWordIndex(-1);
      return;
    }

    soundManager.playSparkle();
    setIsNarrating(true);
    setActiveWordIndex(0);

    const totalWords = currentPage.words.length;
    let wordIdx = 0;

    // Speak sentence
    soundManager.speak(currentPage.text, 'ar');

    // Interval to advance word highlighting (approx 350ms per word)
    const interval = setInterval(() => {
      wordIdx++;
      if (wordIdx < totalWords) {
        setActiveWordIndex(wordIdx);
      } else {
        clearInterval(interval);
        setIsNarrating(false);
        setActiveWordIndex(-1);
      }
    }, 420);
  };

  // Click individual word to hear it pronounced
  const handleWordClick = (word: string, index: number) => {
    soundManager.playPop();
    setActiveWordIndex(index);
    soundManager.speak(word, 'ar');
  };

  // Hotspot click
  const handleHotspotClick = (h: StoryHotspot) => {
    soundManager.playSparkle();
    setActiveHotspot(h);
    soundManager.speak(`${h.name}... ${h.description}`, 'ar');
  };

  // Handle challenge choice
  const handleChoiceSelect = (index: number, starsBonus: number) => {
    setSelectedChoiceIndex(index);
    soundManager.playFanfare();
    confetti({ particleCount: 70, spread: 60 });
    onAwardStars(starsBonus);
  };

  const nextPage = () => {
    if (currentPageIndex < currentStory.pages.length - 1) {
      soundManager.playClick();
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      soundManager.playClick();
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-amber-100 text-amber-600 text-2xl">📖</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-lg border border-amber-200">
                {currentStory.badge}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                صفحة {currentPageIndex + 1} من {currentStory.pages.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {currentStory.title}
            </h2>
          </div>
        </div>

        {/* Read aloud & Page controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadPage}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer ${
              isNarrating
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-amber-500 hover:bg-amber-600 text-white hover:scale-103'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isNarrating ? 'إيقاف القراءة ⏸️' : 'اقرأ المشهد بصوت ناطق 📢'}</span>
          </button>
        </div>
      </div>

      {/* Main Living Storybook Frame with Animated Flip */}
      <div className="relative bg-gradient-to-b from-[#2D1B08] to-[#1A0F04] p-3 sm:p-6 rounded-3xl shadow-2xl border-4 border-amber-600/60 overflow-hidden">
        {/* Animated Page Surface */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            initial={{ opacity: 0, scale: 0.96, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.96, rotateY: 10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FFFDF9] rounded-2xl p-4 sm:p-6 shadow-inner border border-amber-200"
          >
            {/* Visual Living Stage (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md group">
                {/* Background Image */}
                <img
                  src={currentPage.bgImage}
                  alt={currentPage.title}
                  className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
                />

                {/* Animated Floating Magic Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-12 text-xl animate-float-gentle opacity-75">✨</div>
                  <div className="absolute bottom-16 right-20 text-2xl animate-bounce opacity-80">🌟</div>
                  <div className="absolute top-24 right-12 text-sm animate-pulse opacity-90">💫</div>
                </div>

                {/* Interactive Clickable Hotspots on the scene */}
                {currentPage.hotspots.map((h) => (
                  <div
                    key={h.id}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => handleHotspotClick(h)}
                      className="group/spot relative flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                      {/* Pulsing ring */}
                      <span className="absolute -inset-2 rounded-full bg-amber-400/60 animate-ping"></span>
                      <div className="relative w-9 h-9 rounded-full bg-white/95 border-2 border-amber-500 shadow-lg flex items-center justify-center text-lg transform group-hover/spot:scale-125 transition-transform">
                        <span>{h.emoji}</span>
                      </div>
                      <span className="mt-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap opacity-90 group-hover/spot:opacity-100">
                        {h.name}
                      </span>
                    </button>
                  </div>
                ))}

                {/* Scene title kicker badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-black text-slate-800 shadow-xs border border-amber-200">
                  {currentPage.title}
                </div>
              </div>

              {/* Active Hotspot Educational Discovery Card */}
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-linear-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{activeHotspot.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">
                          اكتشاف: {activeHotspot.name}
                        </h4>
                        <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                          يبدأ بحرف ({activeHotspot.letter})
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {activeHotspot.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </div>

            {/* Reading, Vocabulary & Branching Choice Section (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              {/* Story Narrative Box with Karaoke Word-by-Word highlighting */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>نص الحكاية (اضغط على أي كلمة لسماع نطقها):</span>
                  </span>
                </div>

                {/* Karaoke Words Flow */}
                <div className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-200 flex flex-wrap items-center gap-2 leading-loose">
                  {currentPage.words.map((word, idx) => {
                    const isHighlighted = activeWordIndex === idx;
                    return (
                      <button
                        key={`${word}-${idx}`}
                        onClick={() => handleWordClick(word, idx)}
                        className={`px-2 py-1 rounded-xl text-base sm:text-lg font-black transition-all cursor-pointer ${
                          isHighlighted
                            ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                            : 'text-slate-900 hover:text-amber-700 hover:bg-amber-100/70'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Moral Lesson of the Scene */}
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 flex items-center gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 block">حكمة المشهد:</span>
                  <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
                    {currentPage.moralLesson}
                  </p>
                </div>
              </div>

              {/* Interactive Branching Challenge ("أنت البطل!") */}
              {currentPage.interactiveChallenge && (
                <div className="bg-linear-to-br from-purple-50 to-indigo-50 p-4 rounded-2xl border border-purple-200 space-y-3">
                  <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    <span>تحدي البطل: {currentPage.interactiveChallenge.question}</span>
                  </span>

                  <div className="space-y-2">
                    {currentPage.interactiveChallenge.choices.map((choice, i) => {
                      const isChosen = selectedChoiceIndex === i;
                      return (
                        <button
                          key={i}
                          onClick={() => handleChoiceSelect(i, choice.starsBonus)}
                          className={`w-full p-2.5 rounded-xl border text-right text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isChosen
                              ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                              : 'bg-white hover:bg-purple-100/60 border-purple-200 text-slate-800'
                          }`}
                        >
                          <span>{choice.text}</span>
                          {isChosen ? (
                            <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                          ) : (
                            <span className="text-amber-600 text-[10px]">+{choice.starsBonus} ⭐</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedChoiceIndex !== null && (
                    <div className="text-xs font-bold text-purple-900 bg-white/80 p-2 rounded-xl animate-fade-in">
                      {currentPage.interactiveChallenge.choices[selectedChoiceIndex].nextHint}
                    </div>
                  )}
                </div>
              )}

              {/* Page Turning Navigation Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                <button
                  onClick={prevPage}
                  disabled={currentPageIndex === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentPageIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>المشهد السابق</span>
                </button>

                <div className="flex items-center gap-1">
                  {currentStory.pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPageIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        i === currentPageIndex ? 'bg-amber-500 w-6' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPageIndex === currentStory.pages.length - 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    currentPageIndex === currentStory.pages.length - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                  }`}
                >
                  <span>المشهد التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
