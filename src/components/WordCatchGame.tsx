import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { BALLOON_LETTERS_POOL } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { Play, RotateCcw, Volume2, Award, Zap, Heart } from 'lucide-react';

interface WordCatchGameProps {
  onAwardStars: (amount: number) => void;
}

interface Balloon {
  id: number;
  letter: string;
  x: number; // percentage 10% - 90%
  y: number; // percentage 0% - 100%
  speed: number;
  color: string;
  isPopping: boolean;
}

export const WordCatchGame: React.FC<WordCatchGameProps> = ({ onAwardStars }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [targetLetter, setTargetLetter] = useState('أ');
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const balloonColors = [
    'from-rose-400 to-red-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-blue-500',
    'from-purple-400 to-indigo-500',
    'from-pink-400 to-rose-500',
  ];

  const gameLoopRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const balloonCounterRef = useRef<number>(1);

  // Pick new random target letter
  const pickNewTarget = useCallback(() => {
    const randomLetter =
      BALLOON_LETTERS_POOL[Math.floor(Math.random() * BALLOON_LETTERS_POOL.length)];
    setTargetLetter(randomLetter);
    soundManager.speak(`ابحث عن حرف: ${randomLetter}`, 'ar');
  }, []);

  // Start / Restart Game
  const startGame = () => {
    soundManager.playFanfare();
    setScore(0);
    setCombo(0);
    setLives(3);
    setTimeLeft(60);
    setGameOver(false);
    setBalloons([]);
    setIsPlaying(true);
    pickNewTarget();
  };

  // Keyboard support: child can press the letter on their keyboard to pop!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      const key = e.key;
      // Match against balloons
      const matched = balloons.find((b) => !b.isPopping && b.letter === key);
      if (matched) {
        handlePop(matched);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, balloons]);

  // Main animation and spawn loop
  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Spawn balloons every ~1.2 seconds
      if (currentTime - lastSpawnRef.current > 1200) {
        lastSpawnRef.current = currentTime;

        // 45% chance to spawn the target letter, 55% other letters
        const letter =
          Math.random() < 0.45
            ? targetLetter
            : BALLOON_LETTERS_POOL[Math.floor(Math.random() * BALLOON_LETTERS_POOL.length)];

        const newBalloon: Balloon = {
          id: balloonCounterRef.current++,
          letter,
          x: 10 + Math.random() * 80,
          y: -10, // start above top
          speed: 15 + Math.random() * 12, // vertical descent speed % per second
          color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
          isPopping: false,
        };

        setBalloons((prev) => [...prev, newBalloon]);
      }

      // Move balloons down
      setBalloons((prev) => {
        const next: Balloon[] = [];
        for (const b of prev) {
          if (b.isPopping) continue;
          const nextY = b.y + b.speed * delta;
          if (nextY > 105) {
            // Escaped bottom
            if (b.letter === targetLetter) {
              // Missed the target
              setCombo(0);
            }
          } else {
            next.push({ ...b, y: nextY });
          }
        }
        return next;
      });

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, gameOver, targetLetter]);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          setIsPlaying(false);
          soundManager.playFanfare();
          confetti({ particleCount: 90, spread: 70 });
          onAwardStars(Math.max(1, Math.floor(score / 300)));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, score, onAwardStars]);

  // Handle balloon popping
  const handlePop = (balloon: Balloon) => {
    if (balloon.isPopping) return;

    if (balloon.letter === targetLetter) {
      soundManager.playPop();
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      const points = 100 * Math.min(nextCombo, 4);
      setScore((s) => s + points);

      // Trigger pop animation
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, isPopping: true } : b))
      );

      // Choose new target every 2-3 correct hits
      if (nextCombo % 2 === 0) {
        pickNewTarget();
      }
    } else {
      // Wrong balloon clicked
      soundManager.playBoing();
      setCombo(0);
      setLives((l) => {
        const nextLives = l - 1;
        if (nextLives <= 0) {
          setGameOver(true);
          setIsPlaying(false);
          soundManager.playBoing();
        }
        return nextLives;
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-600 text-2xl">🎈</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              صائد الحروف والكلمات السريعة
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              فرقع بالونات الحرف المطلوب بالماوس أو اضغط الحرف على الكيبورد لزيادة سرعتك!
            </p>
          </div>
        </div>

        {/* Dashboard Counters */}
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200">
            <span>النقاط:</span>
            <span className="text-amber-700 font-extrabold text-base tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-200">
            <span>الوقت:</span>
            <span className="text-blue-700 font-extrabold text-base tabular-nums">{timeLeft} ث</span>
          </div>
          <div className="flex items-center gap-1 text-rose-500 text-base">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Stage Area */}
      <div className="relative w-full h-[460px] bg-linear-to-b from-sky-200 via-sky-100 to-emerald-100 rounded-3xl border-4 border-sky-300 overflow-hidden shadow-xl select-none">
        {/* Sky Clouds and decorative elements */}
        <div className="absolute top-6 left-12 text-5xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-16 right-20 text-6xl opacity-30 animate-pulse">☁️</div>
        <div className="absolute bottom-2 left-0 right-0 h-10 bg-linear-to-t from-emerald-500 to-transparent opacity-20"></div>

        {/* Floating Target Kicker Ribbon */}
        {isPlaying && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3 bg-white/95 px-5 py-2 rounded-2xl shadow-lg border-2 border-amber-400">
            <span className="text-sm font-black text-slate-700">المهمة الحالية:</span>
            <span className="text-2xl font-black text-amber-600 bg-amber-100 px-3 py-0.5 rounded-xl border border-amber-300 animate-bounce">
              {targetLetter}
            </span>
            <button
              onClick={() => soundManager.speak(`حرف ${targetLetter}`, 'ar')}
              className="p-1 text-amber-700 hover:text-amber-900 cursor-pointer"
              title="نطق الحرف المطلوب"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            {combo > 1 && (
              <span className="bg-orange-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                {combo}x حماس! 🔥
              </span>
            )}
          </div>
        )}

        {/* Active Balloons */}
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={() => handlePop(b)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute cursor-pointer transition-transform active:scale-90 ${
              b.isPopping ? 'scale-150 opacity-0 duration-200' : 'hover:scale-110'
            }`}
          >
            {/* Balloon Body */}
            <div
              className={`w-16 h-20 sm:w-20 sm:h-24 rounded-full bg-linear-to-b ${b.color} shadow-lg flex flex-col items-center justify-center relative border-2 border-white/60`}
            >
              <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                {b.letter}
              </span>
              {/* Balloon knot */}
              <div className="absolute -bottom-1.5 w-2 h-2 bg-amber-700 rounded-sm"></div>
              {/* Balloon string */}
              <div className="absolute -bottom-5 w-0.5 h-4 bg-slate-400"></div>
            </div>
          </div>
        ))}

        {/* Start Game Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-6 text-center text-white">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500 text-white flex items-center justify-center text-4xl shadow-xl mb-4 animate-bounce">
              🎈
            </div>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">
              جاهز لتحدي صائد الحروف؟
            </h3>
            <p className="text-sm sm:text-base text-slate-100 max-w-md mb-6 leading-relaxed">
              راقب الحرف المطلوب أعلى الشاشة، واضغط على البالون الصحيح قبل أن يطير بعيداً!
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>ابدأ اللعب الآن!</span>
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center z-30 p-6 text-center text-white animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-amber-500 text-white flex items-center justify-center text-4xl shadow-xl mb-4">
              🏆
            </div>
            <h3 className="text-3xl font-black mb-1">
              أحسنت يا بطل الحروف! 🎉
            </h3>
            <p className="text-slate-200 text-sm mb-4">
              نتيجة رائعة وتفاعل سريع يدل على براعتك!
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 flex items-center gap-6">
              <div>
                <span className="text-xs text-amber-300 block">مجموع النقاط</span>
                <span className="text-2xl font-black text-white tabular-nums">{score}</span>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <span className="text-xs text-yellow-300 block">النجوم المكتسبة</span>
                <span className="text-2xl font-black text-amber-400 tabular-nums">
                  +{Math.max(1, Math.floor(score / 300))} ⭐
                </span>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>العب مرة ثانية!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
