import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, ENGLISH_LETTERS, ArabicLetter, EnglishLetter } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { RotateCcw, Volume2, Award, Download, Sparkles, CheckCircle2, PenTool } from 'lucide-react';

interface LetterTracingCanvasProps {
  onAwardStars: (amount: number) => void;
  onLetterCompleted: (letterChar: string) => void;
  completedLetters: string[];
}

type BrushType = 'pencil' | 'calligraphy' | 'rainbow' | 'eraser';

export const LetterTracingCanvas: React.FC<LetterTracingCanvasProps> = ({
  onAwardStars,
  onLetterCompleted,
  completedLetters,
}) => {
  const [alphabetMode, setAlphabetMode] = useState<'arabic' | 'english'>('arabic');
  const [currentArabicIndex, setCurrentArabicIndex] = useState(0);
  const [currentEnglishIndex, setCurrentEnglishIndex] = useState(0);

  const [brushColor, setBrushColor] = useState('#2563eb'); // blue default
  const [brushSize, setBrushSize] = useState(14);
  const [brushType, setBrushType] = useState<BrushType>('calligraphy');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    show: boolean;
    stars: number;
    message: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rainbowHueRef = useRef<number>(0);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const currentArabic = ARABIC_LETTERS[currentArabicIndex];
  const currentEnglish = ENGLISH_LETTERS[currentEnglishIndex];

  const currentChar = alphabetMode === 'arabic' ? currentArabic.char : currentEnglish.char;
  const currentName = alphabetMode === 'arabic' ? currentArabic.name : currentEnglish.name;
  const currentWord = alphabetMode === 'arabic' ? currentArabic.word : currentEnglish.word;
  const currentMeaning = alphabetMode === 'arabic' ? currentArabic.meaning : currentEnglish.meaning;
  const currentEmoji = alphabetMode === 'arabic' ? currentArabic.emoji : currentEnglish.emoji;
  const currentTip = alphabetMode === 'arabic' ? currentArabic.tip : `ارسم الحرف ${currentEnglish.char} بحركات واثقة!`;

  // Draw background guidelines and ghost letter guide
  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset transform & clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Notebook paper background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ruled lines (School notebook)
    const midY = canvas.height * 0.52;
    const topY = canvas.height * 0.28;
    const bottomY = canvas.height * 0.76;

    // Baseline (Solid amber)
    ctx.beginPath();
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.moveTo(30, midY);
    ctx.lineTo(canvas.width - 30, midY);
    ctx.stroke();

    // Top guide line (Dashed sky blue)
    ctx.beginPath();
    ctx.strokeStyle = '#93C5FD';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1.5;
    ctx.moveTo(30, topY);
    ctx.lineTo(canvas.width - 30, topY);
    ctx.stroke();

    // Descent guide line (Dashed red/coral)
    ctx.beginPath();
    ctx.strokeStyle = '#FCA5A5';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1.5;
    ctx.moveTo(30, bottomY);
    ctx.lineTo(canvas.width - 30, bottomY);
    ctx.stroke();
    ctx.setLineDash([]); // reset dash

    // Ruled margins
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, 24, canvas.height);
    ctx.fillRect(canvas.width - 24, 0, 24, canvas.height);

    // Ghost letter watermark guide for tracing
    ctx.save();
    ctx.fillStyle = 'rgba(203, 213, 225, 0.45)'; // soft ghost slate
    ctx.font = alphabetMode === 'arabic' ? 'bold 240px "Cairo", sans-serif' : 'bold 240px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentChar, canvas.width / 2, canvas.height / 2 + 10);
    ctx.restore();
  }, [currentChar, alphabetMode]);

  // Redraw when letter changes
  useEffect(() => {
    drawGuide();
    setHasDrawn(false);
    setEvaluationResult(null);
  }, [drawGuide]);

  // Handle Resize of canvas to maintain sharpness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = Math.min(parent.clientWidth, 680);
    const height = 400;

    canvas.width = width;
    canvas.height = height;
    drawGuide();
  }, [drawGuide]);

  // Pronunciation
  const handlePronounce = () => {
    soundManager.playSparkle();
    if (alphabetMode === 'arabic') {
      soundManager.speak(`${currentArabic.name}... ${currentArabic.word}`, 'ar');
    } else {
      soundManager.speak(`${currentEnglish.name}... ${currentEnglish.word}`, 'en');
    }
  };

  // Drawing event coordinates
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const coords = getCoordinates(e);
    setIsDrawing(true);
    setHasDrawn(true);
    lastPointRef.current = coords;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPoint = getCoordinates(e);
    const lastPoint = lastPointRef.current || currentPoint;

    ctx.lineCap = brushType === 'calligraphy' ? 'square' : 'round';
    ctx.lineJoin = 'round';

    if (brushType === 'eraser') {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = brushSize * 2.2;
    } else if (brushType === 'rainbow') {
      rainbowHueRef.current = (rainbowHueRef.current + 4) % 360;
      ctx.strokeStyle = `hsl(${rainbowHueRef.current}, 90%, 55%)`;
      ctx.lineWidth = brushSize;
    } else if (brushType === 'calligraphy') {
      // Islamic & Arabic calligraphy angled chisel stroke effect
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize * 1.3;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();

    lastPointRef.current = currentPoint;
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  // Clear Canvas
  const handleClear = () => {
    soundManager.playPop();
    drawGuide();
    setHasDrawn(false);
    setEvaluationResult(null);
  };

  // Evaluate Drawing
  const handleEvaluate = () => {
    if (!hasDrawn) {
      soundManager.playBoing();
      setEvaluationResult({
        show: true,
        stars: 1,
        message: 'ارسم الحرف أولاً على اللوحة يا بطل لتكسب النجوم!',
      });
      return;
    }

    // Victory celebration!
    soundManager.playFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
    });

    onAwardStars(3);
    onLetterCompleted(currentChar);

    setEvaluationResult({
      show: true,
      stars: 3,
      message: `ممتاز يا فنان! رسمت حرف (${currentChar}) بخط رائع وأنيق! 🎉`,
    });
  };

  // Download artwork
  const handleDownload = () => {
    soundManager.playSparkle();
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a framed presentation
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width + 60;
    exportCanvas.height = canvas.height + 110;
    const expCtx = exportCanvas.getContext('2d');
    if (!expCtx) return;

    // Outer frame
    expCtx.fillStyle = '#FEF3C7'; // warm cream
    expCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Inner shadow border
    expCtx.strokeStyle = '#F59E0B';
    expCtx.lineWidth = 4;
    expCtx.strokeRect(15, 15, exportCanvas.width - 30, exportCanvas.height - 30);

    // Draw the kid's artwork
    expCtx.drawImage(canvas, 30, 30);

    // Footer text
    expCtx.fillStyle = '#92400E';
    expCtx.font = 'bold 20px "Cairo", sans-serif';
    expCtx.textAlign = 'center';
    expCtx.fillText(
      `إبداع الخطاط الصغير · حرف ${currentChar} (${currentWord})`,
      exportCanvas.width / 2,
      exportCanvas.height - 35
    );

    const link = document.createElement('a');
    link.download = `khattati_${currentChar}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const colors = [
    { name: 'أزرق ملكي', val: '#2563eb' },
    { name: 'أخضر زمردي', val: '#059669' },
    { name: 'أحمر ياقوتي', val: '#dc2626' },
    { name: 'برتقالي مشرق', val: '#ea580c' },
    { name: 'بنفسجي سحري', val: '#7c3aed' },
    { name: 'وردي لطيف', val: '#db2777' },
    { name: 'أسود كلاسيكي', val: '#1e293b' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">✍️</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                لوحة رسم الحروف وكراسة الخط العربي
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                تعلّم رسم الحروف بالسطور الصحيحة، ونمّي مهارات يديك بالكتابة الرشيقة!
              </p>
            </div>
          </div>
        </div>

        {/* Alphabet Language Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-amber-50 rounded-2xl border border-amber-200">
          <button
            onClick={() => {
              soundManager.playClick();
              setAlphabetMode('arabic');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              alphabetMode === 'arabic'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الحروف العربية (٢٨)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setAlphabetMode('english');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              alphabetMode === 'english'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English Alphabet (A-Z)
          </button>
        </div>
      </div>

      {/* Alphabet Carousel Carousel Strip */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {alphabetMode === 'arabic'
            ? ARABIC_LETTERS.map((item, idx) => {
                const isSelected = idx === currentArabicIndex;
                const isDone = completedLetters.includes(item.char);
                return (
                  <button
                    key={item.char}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentArabicIndex(idx);
                    }}
                    className={`relative min-w-[54px] h-14 rounded-2xl flex flex-col items-center justify-center font-bold transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-white scale-108 shadow-md'
                        : 'bg-amber-50/60 hover:bg-amber-100/70 text-slate-800 border border-amber-200/50'
                    }`}
                  >
                    <span className="text-xl font-black">{item.char}</span>
                    <span className="text-[10px] opacity-80">{item.name}</span>
                    {isDone && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })
            : ENGLISH_LETTERS.map((item, idx) => {
                const isSelected = idx === currentEnglishIndex;
                const isDone = completedLetters.includes(item.char);
                return (
                  <button
                    key={item.char}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentEnglishIndex(idx);
                    }}
                    className={`relative min-w-[54px] h-14 rounded-2xl flex flex-col items-center justify-center font-bold transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-amber-500 text-white scale-108 shadow-md'
                        : 'bg-amber-50/60 hover:bg-amber-100/70 text-slate-800 border border-amber-200/50'
                    }`}
                  >
                    <span className="text-xl font-black">{item.char}</span>
                    <span className="text-[10px] opacity-80">{item.word}</span>
                    {isDone && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
        </div>
      </div>

      {/* Main Interactive Stage & Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Canvas Stage (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-slate-200 shadow-md flex flex-col items-center">
          {/* Letter Info Kicker */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentEmoji}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-slate-900">
                    حرف {currentChar} - {currentName}
                  </h3>
                  <button
                    onClick={handlePronounce}
                    className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors cursor-pointer"
                    title="استمع للنطق"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  مثال: <strong className="text-amber-700">{currentWord}</strong> ({currentMeaning})
                </p>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                title="مسح اللوحة والبدء من جديد"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                title="تنزيل اللوحة كصورة"
              >
                <Download className="w-3.5 h-3.5" />
                <span>حفظ اللوحة</span>
              </button>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="relative w-full flex justify-center bg-slate-50 rounded-2xl p-2 border-2 border-dashed border-amber-200 overflow-hidden touch-none">
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              className="rounded-xl shadow-xs cursor-crosshair max-w-full bg-white select-none"
            />
          </div>

          {/* Handwriting rule explanation */}
          <div className="w-full mt-3 flex items-center justify-between text-[11px] text-slate-500 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>خط الأساس (السطر الرئيسي للكتابة)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
              <span>خط القمة للحروف الصاعدة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
              <span>خط الهبوط للحروف النازلة</span>
            </div>
          </div>

          {/* Evaluation / Rewards Banner */}
          {evaluationResult && (
            <div className="w-full mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 font-black">
                    {Array.from({ length: evaluationResult.stars }).map((_, i) => (
                      <span key={i} className="text-lg animate-bounce">⭐</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {evaluationResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Big Action Check Button */}
          <div className="w-full mt-4">
            <button
              onClick={handleEvaluate}
              className="w-full py-3.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5 text-yellow-200" />
              <span>تحقق من خطي واكسب النجوم! 🌟</span>
            </button>
          </div>
        </div>

        {/* Right / Controls Deck (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Tool Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-600" />
              <span>نوع الفرشاة والقلم</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setBrushType('calligraphy');
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  brushType === 'calligraphy'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>✒️</span>
                <span>قلم الخط العربي</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setBrushType('pencil');
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  brushType === 'pencil'
                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>✏️</span>
                <span>قلم الرصاص</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setBrushType('rainbow');
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  brushType === 'rainbow'
                    ? 'border-purple-500 bg-purple-50 text-purple-800 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>فرشاة قوس قزح</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setBrushType('eraser');
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  brushType === 'eraser'
                    ? 'border-rose-500 bg-rose-50 text-rose-800 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>🧹</span>
                <span>الممحاة</span>
              </button>
            </div>

            {/* Brush Size Slider */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                <span>سُمك الخط:</span>
                <span className="tabular-nums font-bold text-amber-700">{brushSize}px</span>
              </div>
              <input
                type="range"
                min="6"
                max="32"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Color Palette */}
          {brushType !== 'eraser' && brushType !== 'rainbow' && (
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                اختر لون الحبر 🎨
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                {colors.map((c) => {
                  const isSelected = brushColor === c.val;
                  return (
                    <button
                      key={c.val}
                      onClick={() => {
                        soundManager.playPop();
                        setBrushColor(c.val);
                      }}
                      title={c.name}
                      style={{ backgroundColor: c.val }}
                      className={`w-9 h-9 rounded-2xl cursor-pointer transition-transform ${
                        isSelected ? 'ring-3 ring-amber-400 ring-offset-2 scale-110 shadow-sm' : 'hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Educational Tip from Qalamoor */}
          <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <span className="text-lg">💡</span>
              <span>نصيحة قلمور لكتابة الحرف:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3 rounded-2xl border border-amber-100">
              {currentTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
