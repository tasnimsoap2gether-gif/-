import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TYPING_PRACTICE_WORDS } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { Keyboard, Volume2, RotateCcw, Zap, CheckCircle2 } from 'lucide-react';

interface TypingHeroProps {
  onAwardStars: (amount: number) => void;
}

export const TypingHero: React.FC<TypingHeroProps> = ({ onAwardStars }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentItem = TYPING_PRACTICE_WORDS[currentWordIndex];
  const targetWord = currentItem.word;

  const [typedChars, setTypedChars] = useState<string>('');
  const [completedWordsCount, setCompletedWordsCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // Target letter is the next char to type
  const targetChar = targetWord[typedChars.length] || '';

  // Arabic Keyboard Layout Rows for visual keyboard
  const ARABIC_KEYBOARD_ROWS = [
    ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
    ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
    ['ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ'],
  ];

  // Process typed character
  const handleCharInput = (char: string) => {
    // Normalize character comparisons (e.g., 'أ', 'إ', 'ا')
    const cleanInput = char.replace(/[ً-ْ]/g, '');
    const cleanTarget = targetChar.replace(/[ً-ْ]/g, '');

    const isMatch =
      cleanInput === cleanTarget ||
      (cleanTarget === 'أ' && cleanInput === 'ا') ||
      (cleanTarget === 'إ' && cleanInput === 'ا') ||
      (cleanTarget === 'ا' && (cleanInput === 'أ' || cleanInput === 'إ'));

    if (isMatch) {
      soundManager.playPop();
      const nextTyped = typedChars + targetChar;
      setTypedChars(nextTyped);

      // Check if word complete
      if (nextTyped.length === targetWord.length) {
        soundManager.playFanfare();
        confetti({ particleCount: 60, spread: 60 });
        setCompletedWordsCount((c) => c + 1);
        setStreak((s) => s + 1);
        onAwardStars(2);

        setTimeout(() => {
          setTypedChars('');
          setCurrentWordIndex((idx) => (idx + 1) % TYPING_PRACTICE_WORDS.length);
        }, 600);
      }
    } else {
      soundManager.playBoing();
      setStreak(0);
    }
  };

  // Physical Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setTypedChars((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        handleCharInput(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedChars, targetChar]);

  // Restart word
  const handleResetWord = () => {
    soundManager.playClick();
    setTypedChars('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-sky-100 text-sky-600 text-2xl">⌨️</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              بطل الكيبورد السريع
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              تعلّم الكتابة على لوحة المفاتيح بأصابعك بمهارة وسرعة فائقة!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 rounded-xl border border-sky-200 text-xs font-bold text-sky-800">
            <Zap className="w-4 h-4 text-sky-600" />
            <span>حماس متتالي: {streak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>كلمات مكتملة: {completedWordsCount}</span>
          </div>
        </div>
      </div>

      {/* Word Focus Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md flex flex-col items-center space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">الكلمة الحالية:</span>
          <button
            onClick={() => soundManager.speak(targetWord, 'ar')}
            className="p-1 text-sky-600 hover:text-sky-800 cursor-pointer"
            title="استمع للكلمة"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Big Word Display with Typed & Untyped styling */}
        <div className="flex items-center gap-2 text-4xl sm:text-6xl font-black tracking-widest text-slate-900 bg-sky-50/60 px-8 py-5 rounded-3xl border-2 border-sky-200">
          {targetWord.split('').map((ch, idx) => {
            const isTyped = idx < typedChars.length;
            const isNext = idx === typedChars.length;

            return (
              <span
                key={idx}
                className={`relative px-1 transition-all ${
                  isTyped
                    ? 'text-emerald-500 scale-105'
                    : isNext
                    ? 'text-amber-500 animate-pulse underline decoration-amber-400 decoration-4'
                    : 'text-slate-300'
                }`}
              >
                {ch}
                {isNext && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-600 font-bold">
                    👇
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 font-medium">
          تهجئة الكلمة: <strong className="text-slate-800">{currentItem.hints}</strong>
        </p>

        {/* Visual On-Screen Keyboard */}
        <div className="w-full max-w-2xl bg-slate-100 p-4 rounded-3xl border border-slate-200 shadow-inner space-y-2 select-none">
          {ARABIC_KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1.5">
              {row.map((k) => {
                const isTarget =
                  k === targetChar ||
                  (targetChar === 'أ' && k === 'ا') ||
                  (targetChar === 'إ' && k === 'ا');

                return (
                  <button
                    key={k}
                    onClick={() => handleCharInput(k)}
                    className={`min-w-[34px] sm:min-w-[44px] h-11 sm:h-12 rounded-xl text-sm sm:text-base font-extrabold shadow-xs transition-all cursor-pointer ${
                      isTarget
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-md ring-2 ring-amber-500 animate-bounce'
                        : 'bg-white hover:bg-sky-50 text-slate-800 border border-slate-200 active:scale-95'
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Spacebar row */}
          <div className="flex justify-center pt-1">
            <div className="w-64 h-9 bg-white border border-slate-300 rounded-xl flex items-center justify-center text-[10px] text-slate-400 font-bold">
              مسافة (Space)
            </div>
          </div>
        </div>

        {/* Reset button */}
        <button
          onClick={handleResetWord}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>مسح وإعادة الكلمة</span>
        </button>
      </div>
    </div>
  );
};
