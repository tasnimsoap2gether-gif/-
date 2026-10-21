export interface ArabicLetter {
  char: string;
  name: string;
  word: string;
  meaning: string;
  emoji: string;
  tip: string;
  strokeHint: string;
}

export interface EnglishLetter {
  char: string;
  name: string;
  word: string;
  meaning: string;
  emoji: string;
}

export interface SentencePuzzle {
  id: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'مبدع';
  correctSentence: string[];
  fullSentence: string;
  meaningHint: string;
  icon: string;
}

export interface ComicSticker {
  id: string;
  emoji: string;
  name: string;
  category: 'شخصيات' | 'حيوانات' | 'أدوات الكتابة' | 'طبيعة وفضاء' | 'مؤثرات';
}

export const ARABIC_LETTERS: ArabicLetter[] = [
  { char: 'أ', name: 'ألف', word: 'أَسَد', meaning: 'Lion', emoji: '🦁', tip: 'ارسم خطاً مستقيماً من الأعلى إلى الأسفل ثم ضع الهمزة الصغيرة فوقه!', strokeHint: 'ابدأ من أعلى إلى أسفل خط مستقيم' },
  { char: 'ب', name: 'باء', word: 'بَطَّة', meaning: 'Duck', emoji: '🦆', tip: 'ارسم صحناً جميلاً واسعاً وضع تحته نقطة واحدة!', strokeHint: 'انزل يميناً ثم امشِ على السطر واصعد، ثم ضع النقطة بالأسفل' },
  { char: 'ت', name: 'تاء', word: 'تُفَّاحَة', meaning: 'Apple', emoji: '🍎', tip: 'صحن جميل مبتسم وفوقه عينان (نقطتان)!', strokeHint: 'ارسم الصحن وضع نقطتين فوقه كالعينين المبتسمتين' },
  { char: 'ث', name: 'ثاء', word: 'ثَعْلَب', meaning: 'Fox', emoji: '🦊', tip: 'صحن التاء ولكن يحمل ثلاث نقاط كتاج لطيف!', strokeHint: 'ارسم الصحن ثم ضع ثلاث نقاط بالترتيب فوقه' },
  { char: 'ج', name: 'جيم', word: 'جَمَل', meaning: 'Camel', emoji: '🐪', tip: 'رأس متموج في الأعلى ونصف دائرة كبيرة بداخلها نقطة جوعانة!', strokeHint: 'ارسم موجة أفقية ثم نصف دائرة ونقطة في بطنها' },
  { char: 'ح', name: 'حاء', word: 'حِصَان', meaning: 'Horse', emoji: '🐴', tip: 'مثل الجيم تماماً ولكن بدون نقاط، حرة وخفيفة!', strokeHint: 'ارسم الرأس ثم نصف دائرة أنيقة بدون نقط' },
  { char: 'خ', name: 'خاء', word: 'خَرُوف', meaning: 'Sheep', emoji: '🐑', tip: 'تحمل النقطة فوق رأسها كقبعة جميلة!', strokeHint: 'ارسم شكل الحاء وضع نقطة واحدة فوق الرأس' },
  { char: 'د', name: 'دال', word: 'دُبّ', meaning: 'Bear', emoji: '🐻', tip: 'منحنى لطيف ينزل ويستقر على السطر كزاوية مفتوحة!', strokeHint: 'انزل مائلاً ثم امتد أفقياً على السطر' },
  { char: 'ذ', name: 'ذال', word: 'ذِئْب', meaning: 'Wolf', emoji: '🐺', tip: 'أخت الدال التوأم ولكن مع نقطة لامعة في الأعلى!', strokeHint: 'ارسم الدال ثم زيّنها بنقطة في الأعلى' },
  { char: 'ر', name: 'راء', word: 'رِيشَة', meaning: 'Feather', emoji: '🪶', tip: 'تتزحلق بسلاسة تحت السطر مثل الزحليقة الممتعة!', strokeHint: 'ابدأ فوق السطر قليلاً ثم انزلق منحنياً لأسفل السطر' },
  { char: 'ز', name: 'زاي', word: 'زَرَافَة', meaning: 'Giraffe', emoji: '🦒', tip: 'زحليقة الراء الجميلة ومعها نجمة صغيرة فوقها!', strokeHint: 'تزحلق تحت السطر وضع نقطة في الأعلى' },
  { char: 'س', name: 'سين', word: 'سَمَكَة', meaning: 'Fish', emoji: '🐟', tip: 'ثلاثة أسنان صغيرة وصحن واسع ينزل تحت السطر!', strokeHint: 'سن أول، سن ثانٍ، ثم صحن دائري أنيق' },
  { char: 'ش', name: 'شين', word: 'شَمْس', meaning: 'Sun', emoji: '☀️', tip: 'أخت السين وفوق أسنانها ثلاث نقاط تشرق كالشمس!', strokeHint: 'ثلاثة أسنان ثم صحن وثلاث نقاط فوقها' },
  { char: 'ص', name: 'صاد', word: 'صَقْر', meaning: 'Falcon', emoji: '🦅', tip: 'حلقة بيضاوية ممتدة ثم سنة وصحن رشيق!', strokeHint: 'اصعد مائلاً واقفل الحلقة ثم ارسم الصحن' },
  { char: 'ض', name: 'ضاد', word: 'ضِفْدَع', meaning: 'Frog', emoji: '🐸', tip: 'لغتنا العربية لغة الضاد المميزة بنقطتها الفخورة!', strokeHint: 'ارسم الصاد وضع نقطة واحدة بالأعلى' },
  { char: 'ط', name: 'طاء', word: 'طَيَّارَة', meaning: 'Airplane', emoji: '✈️', tip: 'حلقة بيضاوية مع عصا طويلة ترتفع للسماء!', strokeHint: 'ارسم الحلقة ثم ارسم العصا العمودية المتصلة' },
  { char: 'ظ', name: 'ظاء', word: 'ظَبْي', meaning: 'Antelope', emoji: '🦌', tip: 'مثل الطاء تماماً مع نقطة مشرقة بجانب العصا!', strokeHint: 'ارسم الطاء ثم ضع النقطة على يمين العصا' },
  { char: 'ع', name: 'عين', word: 'عُصْفُور', meaning: 'Sparrow', emoji: '🐦', tip: 'حاجب صغير فوق السطر ونصف دائرة كبيرة تتأرجح تحته!', strokeHint: 'نصف دائرة صغيرة فوق السطر ونصف دائرة كبيرة تحته' },
  { char: 'غ', name: 'غين', word: 'غَزَال', meaning: 'Gazelle', emoji: '🦌', tip: 'أخت العين وتحمل نقطة مثل قطرة مطر!', strokeHint: 'ارسم العين وضع نقطة مشرقة فوقها' },
  { char: 'ف', name: 'فاء', word: 'فَرَاشَة', meaning: 'Butterfly', emoji: '🦋', tip: 'دائرة صغيرة برقبة قصيرة وصحن ممتد مع نقطة!', strokeHint: 'دوّر الرأس الصغير وامشِ أفقياً مع نقطة فوقه' },
  { char: 'ق', name: 'قاف', word: 'قَلَم', meaning: 'Pen', emoji: '✏️', tip: 'قلمنا السحري! رأس مدور وصحن عميق ونقطتان!', strokeHint: 'رأس مدور ينزل في صحن عميق ونقطتان بالأعلى' },
  { char: 'ك', name: 'كاف', word: 'كِتَاب', meaning: 'Book', emoji: '📖', tip: 'عصا طويلة تمشي على السطر وبداخلها همزة رقيقة كالكاف الصغيرة!', strokeHint: 'خط عمودي يلتف على السطر وضع كافاً مصغرة بداخله' },
  { char: 'ل', name: 'لام', word: 'لَيْمُون', meaning: 'Lemon', emoji: '🍋', tip: 'عكاز لطيف مقلوب ينزل ببطء تحت السطر!', strokeHint: 'انزل عمودياً والتف بنصف دائرة إلى أعلى السطر' },
  { char: 'م', name: 'ميم', word: 'مَوْز', meaning: 'Banana', emoji: '🍌', tip: 'دائرة صغيرة أنيقة تنزل منها عصا مستقيمة للأسفل!', strokeHint: 'ارسم رأس الميم ثم انزل بعصا مستقيمة' },
  { char: 'ن', name: 'نون', word: 'نَجْمَة', meaning: 'Star', emoji: '⭐', tip: 'صحن عميق نصف دائري وفي قلبه نجمة لامعة!', strokeHint: 'انزل تحت السطر بصحن مقوس وضع النقطة في المنتصف' },
  { char: 'هـ', name: 'هاء', word: 'هِلَال', meaning: 'Crescent', emoji: '🌙', tip: 'دائرة كبيرة بداخلها دائرة صغيرة تدور كالفرح!', strokeHint: 'منحنى خارجي يلتف حول دائرة داخلية' },
  { char: 'و', name: 'واو', word: 'وَرْدَة', meaning: 'Flower', emoji: '🌹', tip: 'رأس دائري يتزحلق بسعادة مثل الراء!', strokeHint: 'دائرة صغيرة في الأعلى ثم زحليقة تحت السطر' },
  { char: 'ي', name: 'ياء', word: 'يَمَامَة', meaning: 'Dove', emoji: '🕊️', tip: 'بطة تسبح في الماء تحت السطر وتحتها نقطتان!', strokeHint: 'رأس مائل يلتف في جسم مقوس تحت السطر ونقطتان' }
];

export const ENGLISH_LETTERS: EnglishLetter[] = [
  { char: 'A', name: 'Letter A', word: 'Astronaut', meaning: 'رائد فضاء', emoji: '👨‍🚀' },
  { char: 'B', name: 'Letter B', word: 'Book', meaning: 'كتاب', emoji: '📚' },
  { char: 'C', name: 'Letter C', word: 'Cat', meaning: 'قطة', emoji: '🐱' },
  { char: 'D', name: 'Letter D', word: 'Dolphin', meaning: 'دلفين', emoji: '🐬' },
  { char: 'E', name: 'Letter E', word: 'Elephant', meaning: 'فيل', emoji: '🐘' },
  { char: 'F', name: 'Letter F', word: 'Flower', meaning: 'زهرة', emoji: '🌸' },
  { char: 'G', name: 'Letter G', word: 'Guitar', meaning: 'جيتار', emoji: '🎸' },
  { char: 'H', name: 'Letter H', word: 'Heart', meaning: 'قلب', emoji: '💖' },
  { char: 'I', name: 'Letter I', word: 'Island', meaning: 'جزيرة', emoji: '🏝️' },
  { char: 'J', name: 'Letter J', word: 'Jellyfish', meaning: 'قنديل البحر', emoji: '🪼' },
  { char: 'K', name: 'Letter K', word: 'Kite', meaning: 'طائرة ورقية', emoji: '🪁' },
  { char: 'L', name: 'Letter L', word: 'Lion', meaning: 'أسد', emoji: '🦁' },
  { char: 'M', name: 'Letter M', word: 'Moon', meaning: 'قمر', emoji: '🌙' },
  { char: 'N', name: 'Letter N', word: 'Nest', meaning: 'عش', emoji: '🪺' },
  { char: 'O', name: 'Letter O', word: 'Owl', meaning: 'بومة', emoji: '🦉' },
  { char: 'P', name: 'Letter P', word: 'Pencil', meaning: 'قلم رصاص', emoji: '✏️' },
  { char: 'Q', name: 'Letter Q', word: 'Queen', meaning: 'ملكة', emoji: '👑' },
  { char: 'R', name: 'Letter R', word: 'Rainbow', meaning: 'قوس قزح', emoji: '🌈' },
  { char: 'S', name: 'Letter S', word: 'Star', meaning: 'نجمة', emoji: '⭐' },
  { char: 'T', name: 'Letter T', word: 'Tree', meaning: 'شجرة', emoji: '🌳' },
  { char: 'U', name: 'Letter U', word: 'Umbrella', meaning: 'مظلة', emoji: '☂️' },
  { char: 'V', name: 'Letter V', word: 'Violin', meaning: 'كمان', emoji: '🎻' },
  { char: 'W', name: 'Letter W', word: 'Whale', meaning: 'حوت', emoji: '🐋' },
  { char: 'X', name: 'Letter X', word: 'Xylophone', meaning: 'إكسيلوفون', emoji: '🎵' },
  { char: 'Y', name: 'Letter Y', word: 'Yacht', meaning: 'يخت', emoji: '⛵' },
  { char: 'Z', name: 'Letter Z', word: 'Zebra', meaning: 'حمار وحشي', emoji: '🦓' }
];

export const SENTENCE_PUZZLES: SentencePuzzle[] = [
  {
    id: 's1',
    category: 'عالم الطبيعة',
    level: 'مبتدئ',
    correctSentence: ['الشَّمْسُ', 'تُشْرِقُ', 'صَبَاحاً'],
    fullSentence: 'الشَّمْسُ تُشْرِقُ صَبَاحاً',
    meaningHint: 'بداية يوم جميل ومشرق',
    icon: '☀️'
  },
  {
    id: 's2',
    category: 'حب التعلم',
    level: 'مبتدئ',
    correctSentence: ['أَنَا', 'أُحِبُّ', 'القِرَاءَةَ'],
    fullSentence: 'أَنَا أُحِبُّ القِرَاءَةَ',
    meaningHint: 'شعار كل بطل مفكر',
    icon: '📖'
  },
  {
    id: 's3',
    category: 'الإبداع والرسم',
    level: 'مبتدئ',
    correctSentence: ['أَرْسُمُ', 'لَوْحَةً', 'جَمِيلَةً'],
    fullSentence: 'أَرْسُمُ لَوْحَةً جَمِيلَةً',
    meaningHint: 'بالألوان الزاهية والفرشاة',
    icon: '🎨'
  },
  {
    id: 's4',
    category: 'الصداقة والمرح',
    level: 'متوسط',
    correctSentence: ['يَلْعَبُ', 'الأَصْدِقَاءُ', 'فِي', 'الحَدِيقَةِ'],
    fullSentence: 'يَلْعَبُ الأَصْدِقَاءُ فِي الحَدِيقَةِ',
    meaningHint: 'وقت المرح مع الأصدقاء الطيبين',
    icon: '🛝'
  },
  {
    id: 's5',
    category: 'الخيال العلمي',
    level: 'متوسط',
    correctSentence: ['يَسْبَحُ', 'رَائِدُ', 'الفَضَاءِ', 'حَوْلَ', 'القَمَرِ'],
    fullSentence: 'يَسْبَحُ رَائِدُ الفَضَاءِ حَوْلَ القَمَرِ',
    meaningHint: 'مغامرة مذهلة بين النجوم',
    icon: '🚀'
  },
  {
    id: 's6',
    category: 'الكتابة السحرية',
    level: 'مبدع',
    correctSentence: ['يَكْتُبُ', 'القَلَمُ', 'السِّحْرِيُّ', 'قِصَّةً', 'مَلِيئَةً', 'بِالأَمَلِ'],
    fullSentence: 'يَكْتُبُ القَلَمُ السِّحْرِيُّ قِصَّةً مَلِيئَةً بِالأَمَلِ',
    meaningHint: 'قوة الكلمات تصنع المعجزات',
    icon: '✨'
  }
];

export const COMIC_STICKERS: ComicSticker[] = [
  // شخصيات
  { id: 'c1', emoji: '🦉', name: 'البومة الحكيمة قلمور', category: 'شخصيات' },
  { id: 'c2', emoji: '👧', name: 'الكاتبة الصغيرة سارة', category: 'شخصيات' },
  { id: 'c3', emoji: '👦', name: 'البطل المكتشف عمر', category: 'شخصيات' },
  { id: 'c4', emoji: '🧙‍♂️', name: 'ساحر الحكايات', category: 'شخصيات' },
  { id: 'c5', emoji: '🦸‍♀️', name: 'البطلة الخارقة', category: 'شخصيات' },
  { id: 'c6', emoji: '🤖', name: 'الروبوت الصديق', category: 'شخصيات' },

  // حيوانات
  { id: 'a1', emoji: '🐱', name: 'قطة لطيفة', category: 'حيوانات' },
  { id: 'a2', emoji: '🐶', name: 'جرو مرح', category: 'حيوانات' },
  { id: 'a3', emoji: '🦄', name: 'مهر أسطوري', category: 'حيوانات' },
  { id: 'a4', emoji: '🐰', name: 'أرنب يقفز', category: 'حيوانات' },
  { id: 'a5', emoji: '🐬', name: 'دلفين مرح', category: 'حيوانات' },
  { id: 'a6', emoji: '🐢', name: 'سلحفاة هادئة', category: 'حيوانات' },

  // أدوات الكتابة
  { id: 'w1', emoji: '✏️', name: 'قلم رصاص ملون', category: 'أدوات الكتابة' },
  { id: 'w2', emoji: '✒️', name: 'ريشة خط عربي', category: 'أدوات الكتابة' },
  { id: 'w3', emoji: '📖', name: 'كتاب القصص المفتوح', category: 'أدوات الكتابة' },
  { id: 'w4', emoji: '🎨', name: 'باليتة ألوان', category: 'أدوات الكتابة' },
  { id: 'w5', emoji: '📜', name: 'مخطوطة قديمة', category: 'أدوات الكتابة' },
  { id: 'w6', emoji: '🏆', name: 'كأس الكاتب الأول', category: 'أدوات الكتابة' },

  // طبيعة وفضاء
  { id: 'n1', emoji: '🚀', name: 'صاروخ فضاء', category: 'طبيعة وفضاء' },
  { id: 'n2', emoji: '🪐', name: 'كوكب زحل الحلقي', category: 'طبيعة وفضاء' },
  { id: 'n3', emoji: '🌈', name: 'قوس قزح', category: 'طبيعة وفضاء' },
  { id: 'n4', emoji: '🏰', name: 'قلعة سحرية', category: 'طبيعة وفضاء' },
  { id: 'n5', emoji: '🍄', name: 'فطر عملاق ملون', category: 'طبيعة وفضاء' },
  { id: 'n6', emoji: '🌴', name: 'شجرة استوائية', category: 'طبيعة وفضاء' },

  // مؤثرات
  { id: 'e1', emoji: '✨', name: 'بريق سحري', category: 'مؤثرات' },
  { id: 'e2', emoji: '💥', name: 'فرقعة كوميكس', category: 'مؤثرات' },
  { id: 'e3', emoji: '💭', name: 'سحابة أفكار', category: 'مؤثرات' },
  { id: 'e4', emoji: '💬', name: 'فقاعة حديث', category: 'مؤثرات' },
  { id: 'e5', emoji: '❤️', name: 'قلب وردي', category: 'مؤثرات' },
  { id: 'e6', emoji: '⭐', name: 'نجمة ذهبية لامعة', category: 'مؤثرات' }
];

export const TYPING_PRACTICE_WORDS = [
  { word: 'قلم', hints: 'ق - ل - م' },
  { word: 'كتاب', hints: 'ك - ت - ا - ب' },
  { word: 'نور', hints: 'ن - و - ر' },
  { word: 'شمس', hints: 'ش - م - س' },
  { word: 'قمر', hints: 'ق - م - ر' },
  { word: 'وردة', hints: 'و - ر - د - ة' },
  { word: 'سماء', hints: 'س - م - ا - ء' },
  { word: 'فراشة', hints: 'ف - ر - ا - ش - ة' },
  { word: 'أصدقاء', hints: 'أ - ص - د - ق - ا - ء' },
  { word: 'مغامرة', hints: 'م - غ - ا - م - ر - ة' }
];

export const BALLOON_LETTERS_POOL = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ر', 'س', 'ش', 'ص', 'ط', 'ع', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];
