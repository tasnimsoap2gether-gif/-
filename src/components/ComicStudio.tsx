import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { COMIC_STICKERS, ComicSticker } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { Volume2, Award, Download, Plus, Trash2, Move, Type, Palette } from 'lucide-react';

import forestBg from '../assets/images/comic_bg_magical_forest_1792573521022.jpg';
import spaceBg from '../assets/images/comic_bg_space_adventure_1792573521371.jpg';

interface ComicStudioProps {
  onAwardStars: (amount: number) => void;
  onStoryCompleted: () => void;
}

interface PlacedItem {
  id: string;
  type: 'sticker' | 'bubble';
  content: string; // emoji or text
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  bubbleStyle?: 'speech' | 'thought' | 'caption';
  bubbleColor?: string;
}

export const ComicStudio: React.FC<ComicStudioProps> = ({
  onAwardStars,
  onStoryCompleted,
}) => {
  const [selectedBg, setSelectedBg] = useState<'forest' | 'space' | 'castle' | 'sea'>('forest');
  const [storyTitle, setStoryTitle] = useState('مغامرة في الغابة السحرية');
  const [authorName, setAuthorName] = useState('الكاتب المبدع');
  const [narrativeText, setNarrativeText] = useState(
    'في يوم مشرق، ذهب الأصدقاء في رحلة ممتعة بين الأشجار العالية، واكتشفوا بيتاً سحرياً مخفياً تحت الفطر العملاق!'
  );

  const [activeCategory, setActiveCategory] = useState<ComicSticker['category']>('شخصيات');
  const [items, setItems] = useState<PlacedItem[]>([
    {
      id: 'item-1',
      type: 'sticker',
      content: '🦉',
      x: 30,
      y: 40,
      scale: 1.4,
    },
    {
      id: 'item-2',
      type: 'bubble',
      content: 'أهلاً بكم في الغابة السحرية!',
      x: 25,
      y: 20,
      scale: 1,
      bubbleStyle: 'speech',
      bubbleColor: '#ffffff',
    },
    {
      id: 'item-3',
      type: 'sticker',
      content: '🍄',
      x: 70,
      y: 65,
      scale: 1.3,
    },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Background Options
  const backgrounds = [
    { id: 'forest', name: 'الغابة السحرية', src: forestBg },
    { id: 'space', name: 'مغامرة الفضاء', src: spaceBg },
    {
      id: 'castle',
      name: 'قلعة الحكايات',
      color: 'linear-gradient(to bottom, #fde68a, #f97316)',
    },
    {
      id: 'sea',
      name: 'أعماق البحار',
      color: 'linear-gradient(to bottom, #0284c7, #0369a1)',
    },
  ];

  // Add Sticker to Canvas
  const addSticker = (sticker: ComicSticker) => {
    soundManager.playPop();
    const newItem: PlacedItem = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      content: sticker.emoji,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
      scale: 1.2,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // Add Speech Bubble
  const addBubble = (bubbleStyle: 'speech' | 'thought' | 'caption') => {
    soundManager.playPop();
    const defaultText =
      bubbleStyle === 'speech'
        ? 'ما هذا المكان الرائع؟!'
        : bubbleStyle === 'thought'
        ? 'أتمنى لو أستطيع الطيران...'
        : 'وفي تلك اللحظة بالذات...';

    const newItem: PlacedItem = {
      id: `bubble-${Date.now()}`,
      type: 'bubble',
      content: defaultText,
      x: 45,
      y: 35,
      scale: 1,
      bubbleStyle,
      bubbleColor: '#ffffff',
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // Move item with touch/drag or buttons
  const updateItemPosition = (id: string, deltaX: number, deltaY: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextX = Math.max(5, Math.min(90, item.x + deltaX));
          const nextY = Math.max(5, Math.min(85, item.y + deltaY));
          return { ...item, x: nextX, y: nextY };
        }
        return item;
      })
    );
  };

  const updateItemScale = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextScale = Math.max(0.6, Math.min(2.5, item.scale + delta));
          return { ...item, scale: nextScale };
        }
        return item;
      })
    );
  };

  const updateItemContent = (id: string, newContent: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: newContent } : item))
    );
  };

  const deleteItem = (id: string) => {
    soundManager.playClick();
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  // Read Story Aloud
  const handleReadStory = () => {
    soundManager.playSparkle();
    const bubbleTexts = items
      .filter((it) => it.type === 'bubble')
      .map((it) => it.content)
      .join('... ');
    const fullStory = `${storyTitle}. بقلم ${authorName}. ${narrativeText}. حوار القصة: ${bubbleTexts}`;
    soundManager.speak(fullStory, 'ar');
  };

  // Publish & Celebrate Story
  const handlePublishStory = () => {
    soundManager.playFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
    onAwardStars(5);
    onStoryCompleted();
  };

  const selectedItem = items.find((it) => it.id === selectedItemId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-orange-100 text-orange-600 text-2xl">🎨</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              استوديو المؤلف والرسام الصغير
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              صمم قصتك الكرتونية المصورة! اختر المشهد والشخصيات واكتب الحوارات والسرد الشيق.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReadStory}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>اقرأ قصتي بصوت عالٍ 📢</span>
          </button>
          <button
            onClick={handlePublishStory}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-xs transition-transform hover:scale-103 cursor-pointer"
          >
            <Award className="w-4 h-4 text-yellow-200" />
            <span>نشر القصة والفوز بـ ٥ نجوم ⭐</span>
          </button>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: The Comic Stage (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Story Title & Author inputs */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">عنوان القصة:</label>
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="w-full text-base font-black text-slate-900 bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="أدخل عنواناً مشوقاً..."
              />
            </div>
            <div className="w-full sm:w-52">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">اسم المؤلف الصغير:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full text-sm font-bold text-amber-700 bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="اسمك هنا..."
              />
            </div>
          </div>

          {/* Visual Comic Stage Frame */}
          <div
            ref={stageRef}
            className="relative w-full h-[430px] rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl select-none"
            style={{
              backgroundImage:
                selectedBg === 'forest'
                  ? `url(${forestBg})`
                  : selectedBg === 'space'
                  ? `url(${spaceBg})`
                  : undefined,
              background:
                selectedBg === 'castle'
                  ? 'linear-gradient(to bottom, #fde68a, #f97316)'
                  : selectedBg === 'sea'
                  ? 'linear-gradient(to bottom, #0284c7, #0369a1)'
                  : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Stamp Brand Overlay */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-xs border border-white">
              📖 مجلة الكتّاب الصغار المصورة
            </div>

            {/* Placed Elements (Stickers and Bubbles) */}
            {items.map((item) => {
              const isSelected = item.id === selectedItemId;

              if (item.type === 'sticker') {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundManager.playPop();
                      setSelectedItemId(item.id);
                    }}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: `translate(-50%, -50%) scale(${item.scale})`,
                    }}
                    className={`absolute cursor-pointer transition-all duration-150 ${
                      isSelected ? 'ring-3 ring-amber-400 ring-offset-2 rounded-2xl scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <span className="text-5xl sm:text-6xl select-none filter drop-shadow-md">
                      {item.content}
                    </span>
                  </div>
                );
              }

              // Speech Bubble Item
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedItemId(item.id);
                  }}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) scale(${item.scale})`,
                  }}
                  className={`absolute max-w-[220px] cursor-pointer transition-all ${
                    isSelected ? 'ring-3 ring-amber-400 ring-offset-2' : ''
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl shadow-lg border-2 border-slate-900 text-xs sm:text-sm font-bold text-slate-900 leading-snug relative ${
                      item.bubbleStyle === 'speech'
                        ? 'bg-white'
                        : item.bubbleStyle === 'thought'
                        ? 'bg-amber-100 rounded-3xl border-dashed'
                        : 'bg-yellow-200'
                    }`}
                  >
                    {item.content}
                    {/* Speech pointer tail */}
                    {item.bubbleStyle === 'speech' && (
                      <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-slate-900 transform rotate-45"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Narrative / Story Caption Box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Type className="w-4 h-4 text-amber-600" />
                <span>سرد القصة وتفاصيل الأحداث (صندوق الراوي):</span>
              </span>
              <span className="text-slate-400">{narrativeText.length} حرفاً</span>
            </div>
            <textarea
              rows={3}
              value={narrativeText}
              onChange={(e) => setNarrativeText(e.target.value)}
              className="w-full text-sm font-medium text-slate-800 bg-amber-50/40 border border-amber-200 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none leading-relaxed"
              placeholder="اكتب هنا ما حدث في قصتك الجميلة، من البداية حتى النهاية السعيدة..."
            />
          </div>
        </div>

        {/* Right: Tools & Elements Shelf (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Selected Item Controller (if any) */}
          {selectedItem && (
            <div className="bg-amber-50 rounded-3xl p-4 border border-amber-300 shadow-xs space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5" />
                  <span>التحكم في العنصر المحدد:</span>
                </span>
                <button
                  onClick={() => deleteItem(selectedItem.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                  title="حذف العنصر"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Position Nudge D-pad */}
              <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
                <div></div>
                <button
                  onClick={() => updateItemPosition(selectedItem.id, 0, -6)}
                  className="p-1.5 bg-white hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  ▲
                </button>
                <div></div>
                <button
                  onClick={() => updateItemPosition(selectedItem.id, 6, 0)}
                  className="p-1.5 bg-white hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  ►
                </button>
                <div className="text-[10px] text-center text-slate-400 flex items-center justify-center">
                  حرّك
                </div>
                <button
                  onClick={() => updateItemPosition(selectedItem.id, -6, 0)}
                  className="p-1.5 bg-white hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  ◄
                </button>
                <div></div>
                <button
                  onClick={() => updateItemPosition(selectedItem.id, 0, 6)}
                  className="p-1.5 bg-white hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                >
                  ▼
                </button>
                <div></div>
              </div>

              {/* Scale Controls */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-600 font-semibold">الحجم:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateItemScale(selectedItem.id, -0.2)}
                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    - تصغير
                  </button>
                  <button
                    onClick={() => updateItemScale(selectedItem.id, 0.2)}
                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    + تكبير
                  </button>
                </div>
              </div>

              {/* Editable Text if it's a bubble */}
              {selectedItem.type === 'bubble' && (
                <div className="pt-2 border-t border-amber-200">
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    نص الحوار في الفقاعة:
                  </label>
                  <input
                    type="text"
                    value={selectedItem.content}
                    onChange={(e) => updateItemContent(selectedItem.id, e.target.value)}
                    className="w-full text-xs font-bold bg-white border border-amber-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>
          )}

          {/* Background Scene Selector */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-orange-500" />
              <span>اختر مشهد القصة 🏞️</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBg(bg.id as unknown as typeof selectedBg);
                  }}
                  className={`p-2 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
                    selectedBg === bg.id
                      ? 'border-orange-500 bg-orange-50 text-orange-800 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="block">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Speech Bubble Creators */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-blue-500" />
              <span>أضف فقاعة حوار وكتابة 💬</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => addBubble('speech')}
                className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                💬 حوار
              </button>
              <button
                onClick={() => addBubble('thought')}
                className="p-2 bg-slate-50 hover:bg-amber-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                💭 أفكار
              </button>
              <button
                onClick={() => addBubble('caption')}
                className="p-2 bg-slate-50 hover:bg-yellow-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                📜 لافتة
              </button>
            </div>
          </div>

          {/* Sticker Tray */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span>ملصقات وشخصيات القصة ✨</span>
            </h4>

            {/* Category tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px] font-bold">
              {(['شخصيات', 'حيوانات', 'أدوات الكتابة', 'طبيعة وفضاء', 'مؤثرات'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveCategory(cat);
                    }}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                      activeCategory === cat
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto p-1">
              {COMIC_STICKERS.filter((s) => s.category === activeCategory).map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => addSticker(sticker)}
                  title={sticker.name}
                  className="p-2.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
                >
                  <span className="text-3xl mb-1">{sticker.emoji}</span>
                  <span className="text-[10px] text-slate-600 text-center font-bold line-clamp-1">
                    {sticker.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
