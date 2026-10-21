import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { X, Heart, MessageSquare, Send, Sparkles, Smile, Award } from 'lucide-react';

interface FriendsGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardStars: (amount: number) => void;
  childName: string;
}

interface FriendCard {
  id: string;
  name: string;
  avatar: string;
  city: string;
  status: string;
  favoriteLetter: string;
  badge: string;
  likes: number;
}

export const FriendsGardenModal: React.FC<FriendsGardenModalProps> = ({
  isOpen,
  onClose,
  onAwardStars,
  childName,
}) => {
  const [friends, setFriends] = useState<FriendCard[]>([
    {
      id: 'f1',
      name: 'سارة',
      avatar: '👧',
      city: 'القاهرة',
      status: 'ألّفت اليوم قصة رائعة عن الأرنب السريع في استوديو الكوميكس!',
      favoriteLetter: 'س',
      badge: 'مؤلفة بارعة ✍️',
      likes: 12,
    },
    {
      id: 'f2',
      name: 'عمر',
      avatar: '👦',
      city: 'الرياض',
      status: 'أتقنت خط الأساس في كراسة الخط العربي وحصلت على ٣ نجوم!',
      favoriteLetter: 'ع',
      badge: 'خطاط المستقبل ✒️',
      likes: 15,
    },
    {
      id: 'f3',
      name: 'نورة',
      avatar: '👧',
      city: 'دبي',
      status: 'حققت رقماً قياسياً في لعبة صائد البالونات وفرقعت ٤٠ بالوناً!',
      favoriteLetter: 'ن',
      badge: 'صائدة النجوم 🎈',
      likes: 19,
    },
    {
      id: 'f4',
      name: 'كريم',
      avatar: '👦',
      city: 'عمان',
      status: 'قمت بتركيب جميع الجمل الصعبة في مختبر الكلمات بنجاح!',
      favoriteLetter: 'ك',
      badge: 'عبقري الجمل 🧩',
      likes: 8,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [sentGreetings, setSentGreetings] = useState<string[]>([
    'مرحباً بجميع الأصدقاء الأبطال في حديقة الإبداع! 🌸',
  ]);

  if (!isOpen) return null;

  const handleLikeFriend = (id: string) => {
    soundManager.playHighFive();
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, likes: f.likes + 1 } : f))
    );
  };

  const handleSendGreeting = () => {
    if (!newMessage.trim()) return;
    soundManager.playFanfare();
    confetti({ particleCount: 50, spread: 60 });
    setSentGreetings((prev) => [
      `${childName || 'البطل الزائر'}: ${newMessage}`,
      ...prev,
    ]);
    setNewMessage('');
    onAwardStars(3);
    soundManager.speak(`شكراً لمشاركتك اللطيفة مع أصدقاء الحديقة يا ${childName}!`, 'ar');
  };

  const quickStickers = [
    'أهلاً بكم جميعاً! 💖',
    'أنا أحب الكتابة والرسم معكم! 🎨',
    'أنتم أصدقاء رائعون جداً! 🌟',
    'بالتوفيق لكل الأبطال! 🚀',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-pink-200 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-fade-in my-6">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl shadow-xs">
            🤝
          </div>
          <div>
            <span className="text-[11px] font-bold text-pink-600 block">
              نادي حديقة المبدعين الصغار
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              تعرّف على أصدقائك وشاركهم التحيات
            </h2>
          </div>
        </div>

        {/* Friendly Banner */}
        <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200 flex items-center gap-3 text-xs sm:text-sm text-pink-900 font-semibold">
          <span className="text-2xl">💌</span>
          <p>
            في حديقتنا، نشجع بعضنا البعض بكل حب! أرسل تحية لأصدقائك واكسب نجوم المحبة والتعاون!
          </p>
        </div>

        {/* Friends Cards Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 block">
            أصدقاء يلعبون الآن في الحديقة:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {friends.map((f) => (
              <div
                key={f.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-pink-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{f.avatar}</span>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{f.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold">من {f.city}</span>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-lg border border-amber-200">
                    {f.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-snug">
                  &ldquo;{f.status}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[11px] text-slate-400 font-bold">
                    الحرف المفضل: <strong className="text-pink-600">{f.favoriteLetter}</strong>
                  </span>
                  <button
                    onClick={() => handleLikeFriend(f.id)}
                    className="flex items-center gap-1 px-2.5 py-1 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors cursor-pointer font-bold"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span className="tabular-nums">{f.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Send Greeting Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-700 block">
            أرسل تحية لطيفة للأصدقاء في الحديقة:
          </label>

          {/* Quick sticker chips */}
          <div className="flex flex-wrap gap-1.5">
            {quickStickers.map((stk, i) => (
              <button
                key={i}
                onClick={() => setNewMessage(stk)}
                className="text-[11px] font-bold bg-white hover:bg-pink-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                {stk}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="اكتب رسالة تشجيعية هنا..."
              className="flex-1 text-xs sm:text-sm font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={handleSendGreeting}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-103 cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال 🚀</span>
            </button>
          </div>
        </div>

        {/* Recent Greetings Stream */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block">
            أحدث التحيات في الحديقة:
          </span>
          <div className="max-h-32 overflow-y-auto space-y-1.5 p-1">
            {sentGreetings.map((msg, idx) => (
              <div
                key={idx}
                className="text-xs bg-pink-50/50 p-2 rounded-xl border border-pink-100 text-slate-700 font-medium animate-fade-in"
              >
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
