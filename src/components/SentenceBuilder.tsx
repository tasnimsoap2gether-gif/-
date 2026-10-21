import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SENTENCE_PUZZLES, SentencePuzzle } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { Volume2, Award, RotateCcw, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

interface SentenceBuilderProps {
  onAwardStars: (amount: number) => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ onAwardStars }) => {
  const [currentLevel, setCurrentLevel] = useState<'مبتدئ' | 'متوسط' | 'مبدع'>('مبتدئ');
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  const filteredPuzzles = SENTENCE_PUZZLES.filter((p) => p.level === currentLevel);
  const currentPuzzle = filteredPuzzles[puzzleIndex] || filteredPuzzles[0];

  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Initialize & scramble puzzle words
  useEffect(() => {
    if (!currentPuzzle) return;
    const shuffled = [...currentPuzzle.correctSentence].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled);
    setSelectedWords([]);
    setIsSuccess(false);
    setIsError(false);
  }, [currentPuzzle]);

  // Click on scrambled word to pick it
  const handlePickWord = (word: string, index: number) => {
    soundManager.playPop();
    setIsError(false);
    setSelectedWords((prev) => [...prev, word]);
    setScrambledWords((prev) => prev.filter((_, i) => i !== index));
  };

  // Click on assembled word to return it
  const handleReturnWord = (word: string, index: number) => {
    soundManager.playClick();
    setIsError(false);
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    setScrambledWords((prev) => [...prev, word]);
  };

  // Check assembled sentence
  const handleCheck = () => {
    const isCorrect =
      selectedWords.length === currentPuzzle.correctSentence.length &&
      selectedWords.every((w, i) => w === currentPuzzle.correctSentence[i]);

    if (isCorrect) {
      setIsSuccess(true);
      setIsError(false);
      soundManager.playFanfare();
      soundManager.speak(currentPuzzle.fullSentence, 'ar');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onAwardStars(currentLevel === 'مبتدئ' ? 3 : currentLevel === 'متوسط' ? 4 : 5);
    } else {
      setIsError(true);
      soundManager.playBoing();
    }
  };

  // Reset current puzzle
  const handleReset = () => {
    soundManager.playClick();
    const shuffled = [...currentPuzzle.correctSentence].sort(() => Math.random() - 0.5);
    setScrambledWords(shuffled);
    setSelectedWords([]);
    setIsSuccess(false);
    setIsError(false);
  };

  // Next Puzzle
  const handleNextPuzzle = () => {
    soundManager.playSparkle();
    const nextIdx = (puzzleIndex + 1) % filteredPuzzles.length;
    setPuzzleIndex(nextIdx);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-purple-100 text-purple-600 text-2xl">🧩</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              مختبر تركيب الجمل السحرية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              رتّب بطاقات الكلمات لتصنع جملاً جميلة ذات معنى وافهم سياق الحديث!
            </p>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-purple-50 rounded-2xl border border-purple-200">
          {(['مبتدئ', 'متوسط', 'مبدع'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundManager.playClick();
                setCurrentLevel(lvl);
                setPuzzleIndex(0);
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                currentLevel === lvl
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              مستوى {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-8">
        {/* Puzzle Metadata & Hint */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentPuzzle.icon}</span>
            <div>
              <span className="text-xs font-bold text-purple-600 block">
                {currentPuzzle.category} · لغز رقم {puzzleIndex + 1}
              </span>
              <p className="text-sm text-slate-600 font-medium">
                تلميح المعنى: {currentPuzzle.meaningHint}
              </p>
            </div>
          </div>

          <button
            onClick={() => soundManager.speak(currentPuzzle.fullSentence, 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors cursor-pointer"
            title="استمع للجملة بصوت واضح"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">استمع للجملة</span>
          </button>
        </div>

        {/* Sentence Assembly Drop Area (The Output Slots) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 block">
            جملتك المُركّبة (اضغط على أي كلمة لإرجاعها):
          </label>
          <div
            className={`min-h-[90px] p-4 rounded-3xl border-3 border-dashed flex flex-wrap items-center gap-3 transition-colors ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-400'
                : isError
                ? 'bg-rose-50 border-rose-300'
                : 'bg-slate-50 border-purple-200'
            }`}
          >
            {selectedWords.length === 0 ? (
              <span className="text-slate-400 text-sm font-medium w-full text-center">
                اضغط على الكلمات بالأسفل لترتيبها بالترتيب الصحيح هنا...
              </span>
            ) : (
              selectedWords.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  onClick={() => handleReturnWord(word, idx)}
                  className={`px-5 py-3 rounded-2xl text-base sm:text-lg font-black shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                    isSuccess
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-slate-900 border-2 border-purple-300'
                  }`}
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Words Shelf */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 block">
            بطاقات الكلمات المتاحة (اضغط عليها بالترتيب):
          </label>
          <div className="flex flex-wrap items-center gap-3 min-h-[60px] p-2 bg-purple-50/50 rounded-2xl border border-purple-100">
            {scrambledWords.length === 0 ? (
              <span className="text-xs text-purple-600 font-semibold w-full text-center">
                أحسنت! وضعت كل الكلمات في الصندوق أعلاه. الآن اضغط &ldquo;تحقق&rdquo;!
              </span>
            ) : (
              scrambledWords.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  onClick={() => handlePickWord(word, idx)}
                  className="px-5 py-3 bg-white hover:bg-purple-100 text-purple-900 font-extrabold text-base sm:text-lg rounded-2xl border-2 border-purple-200 shadow-sm transition-all hover:-translate-y-1 cursor-pointer"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Success Alert Banner */}
        {isSuccess && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="text-sm font-black text-emerald-900">
                  صحيح تماماً يا عبقري! 🌟🎉
                </h4>
                <p className="text-xs text-emerald-700">
                  لقد رتّبت الجملة بصياغة لغوية ممتازة وأضفت نجوماً جديدة لرصيدك!
                </p>
              </div>
            </div>
            <button
              onClick={handleNextPuzzle}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>اللغز التالي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Error Alert */}
        {isError && (
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 text-rose-800 text-xs font-bold flex items-center justify-between">
            <span>حاول مرة أخرى يا بطل! اقرأ التلميح وحاول إعادة ترتيب الكلمات بشكل أصح.</span>
            <button
              onClick={handleReset}
              className="underline hover:text-rose-950 cursor-pointer"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Controls Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة خلط الكلمات</span>
          </button>

          {!isSuccess ? (
            <button
              onClick={handleCheck}
              disabled={selectedWords.length === 0}
              className={`flex items-center gap-2 px-7 py-3 text-sm font-extrabold rounded-2xl shadow-md transition-all cursor-pointer ${
                selectedWords.length > 0
                  ? 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-103'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>تحقق من صحة الجملة! ✨</span>
            </button>
          ) : (
            <button
              onClick={handleNextPuzzle}
              className="flex items-center gap-2 px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold rounded-2xl shadow-md transition-all hover:scale-103 cursor-pointer"
            >
              <span>التالي ➔</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
