export type HiraganaChar = {
  id: string;
  char: string;
  romaji: string;
  strokeCount: number;
  mistake: string;
  exampleWord: string;
  exampleRomaji: string;
  exampleMeaning: string;
};

export type HiraganaGroup = {
  id: string;
  name: string;
  chars: HiraganaChar[];
};

export const HIRAGANA_GROUPS: HiraganaGroup[] = [
  {
    id: "vowels",
    name: "Basic Vowels",
    chars: [
      { id: "a", char: "あ", romaji: "a", strokeCount: 3, mistake: "The cross stroke should be slightly angled.", exampleWord: "あさ", exampleRomaji: "asa", exampleMeaning: "Morning" },
      { id: "i", char: "い", romaji: "i", strokeCount: 2, mistake: "The left stroke should be longer and hook at the bottom.", exampleWord: "いぬ", exampleRomaji: "inu", exampleMeaning: "Dog" },
      { id: "u", char: "う", romaji: "u", strokeCount: 2, mistake: "The top stroke should be short and angled.", exampleWord: "うみ", exampleRomaji: "umi", exampleMeaning: "Sea" },
      { id: "e", char: "え", romaji: "e", strokeCount: 2, mistake: "The bottom stroke extends too far right.", exampleWord: "えき", exampleRomaji: "eki", exampleMeaning: "Station" },
      { id: "o", char: "お", romaji: "o", strokeCount: 3, mistake: "Don't forget the small dash on the top right.", exampleWord: "おかね", exampleRomaji: "okane", exampleMeaning: "Money" },
    ]
  },
  {
    id: "k",
    name: "K Group",
    chars: [
      { id: "ka", char: "か", romaji: "ka", strokeCount: 3, mistake: "The right dash should not touch the main body.", exampleWord: "かさ", exampleRomaji: "kasa", exampleMeaning: "Umbrella" },
      { id: "ki", char: "き", romaji: "ki", strokeCount: 4, mistake: "The bottom curve is often detached in print, but connected in handwriting.", exampleWord: "きのう", exampleRomaji: "kinou", exampleMeaning: "Yesterday" },
      { id: "ku", char: "く", romaji: "ku", strokeCount: 1, mistake: "The angle should be sharp, like a 'less than' sign.", exampleWord: "くるま", exampleRomaji: "kuruma", exampleMeaning: "Car" },
      { id: "ke", char: "け", romaji: "ke", strokeCount: 3, mistake: "The left vertical stroke needs a slight hook.", exampleWord: "けさ", exampleRomaji: "kesa", exampleMeaning: "This morning" },
      { id: "ko", char: "こ", romaji: "ko", strokeCount: 2, mistake: "The two strokes should curve slightly towards each other.", exampleWord: "こども", exampleRomaji: "kodomo", exampleMeaning: "Child" },
    ]
  },
  {
    id: "s",
    name: "S Group",
    chars: [
      { id: "sa", char: "さ", romaji: "sa", strokeCount: 3, mistake: "Similar to 'ki', the bottom loop can be detached.", exampleWord: "さくら", exampleRomaji: "sakura", exampleMeaning: "Cherry blossom" },
      { id: "shi", char: "し", romaji: "shi", strokeCount: 1, mistake: "Keep the bottom curve smooth like an umbrella handle.", exampleWord: "した", exampleRomaji: "shita", exampleMeaning: "Under" },
      { id: "su", char: "す", romaji: "su", strokeCount: 2, mistake: "The loop should be on the right side of the vertical axis.", exampleWord: "すいか", exampleRomaji: "suika", exampleMeaning: "Watermelon" },
      { id: "se", char: "せ", romaji: "se", strokeCount: 3, mistake: "The right vertical stroke should be longer than the left.", exampleWord: "せんせい", exampleRomaji: "sensei", exampleMeaning: "Teacher" },
      { id: "so", char: "そ", romaji: "so", strokeCount: 1, mistake: "Ensure the top zig-zag is clear and distinct.", exampleWord: "そら", exampleRomaji: "sora", exampleMeaning: "Sky" },
    ]
  },
  {
    id: "t",
    name: "T Group",
    chars: [
      { id: "ta", char: "た", romaji: "ta", strokeCount: 4, mistake: "The two right strokes should resemble a small 'ko' (こ).", exampleWord: "たべもの", exampleRomaji: "tabemono", exampleMeaning: "Food" },
      { id: "chi", char: "ち", romaji: "chi", strokeCount: 2, mistake: "The loop crosses back over the vertical line.", exampleWord: "ちち", exampleRomaji: "chichi", exampleMeaning: "Father" },
      { id: "tsu", char: "つ", romaji: "tsu", strokeCount: 1, mistake: "It should curve smoothly, looking like a wave.", exampleWord: "つき", exampleRomaji: "tsuki", exampleMeaning: "Moon" },
      { id: "te", char: "て", romaji: "te", strokeCount: 1, mistake: "The horizontal line curves softly into a downward arc.", exampleWord: "てがみ", exampleRomaji: "tegami", exampleMeaning: "Letter" },
      { id: "to", char: "と", romaji: "to", strokeCount: 2, mistake: "The second stroke wraps around the first short stroke.", exampleWord: "とけい", exampleRomaji: "tokei", exampleMeaning: "Clock" },
    ]
  },
  {
    id: "n",
    name: "N Group",
    chars: [
      { id: "na", char: "な", romaji: "na", strokeCount: 4, mistake: "The loop at the bottom should be small and neat.", exampleWord: "なまえ", exampleRomaji: "namae", exampleMeaning: "Name" },
      { id: "ni", char: "に", romaji: "ni", strokeCount: 3, mistake: "The right side is just a 'ko' (こ).", exampleWord: "にく", exampleRomaji: "niku", exampleMeaning: "Meat" },
      { id: "nu", char: "ぬ", romaji: "nu", strokeCount: 2, mistake: "Don't forget the small loop at the very end.", exampleWord: "いぬ", exampleRomaji: "inu", exampleMeaning: "Dog" },
      { id: "ne", char: "ね", romaji: "ne", strokeCount: 2, mistake: "Ensure the vertical line goes straight down before the loop.", exampleWord: "ねこ", exampleRomaji: "neko", exampleMeaning: "Cat" },
      { id: "no", char: "の", romaji: "no", strokeCount: 1, mistake: "Start in the middle and loop outwards.", exampleWord: "のみもの", exampleRomaji: "nomimono", exampleMeaning: "Drink" },
    ]
  },
  {
    id: "h",
    name: "H Group",
    chars: [
      { id: "ha", char: "は", romaji: "ha", strokeCount: 3, mistake: "The left stroke needs a slight hook, unlike 'ho'.", exampleWord: "はな", exampleRomaji: "hana", exampleMeaning: "Flower" },
      { id: "hi", char: "ひ", romaji: "hi", strokeCount: 1, mistake: "The shape should resemble a smiling mouth.", exampleWord: "ひと", exampleRomaji: "hito", exampleMeaning: "Person" },
      { id: "fu", char: "ふ", romaji: "fu", strokeCount: 4, mistake: "The parts are separate. Don't connect them into one stroke.", exampleWord: "ふね", exampleRomaji: "fune", exampleMeaning: "Ship" },
      { id: "he", char: "へ", romaji: "he", strokeCount: 1, mistake: "The right side should be longer than the left.", exampleWord: "へや", exampleRomaji: "heya", exampleMeaning: "Room" },
      { id: "ho", char: "ほ", romaji: "ho", strokeCount: 4, mistake: "The top horizontal line must not cross the vertical line.", exampleWord: "ほん", exampleRomaji: "hon", exampleMeaning: "Book" },
    ]
  },
  {
    id: "m",
    name: "M Group",
    chars: [
      { id: "ma", char: "ま", romaji: "ma", strokeCount: 3, mistake: "Two horizontal lines must cross the vertical line.", exampleWord: "まど", exampleRomaji: "mado", exampleMeaning: "Window" },
      { id: "mi", char: "み", romaji: "mi", strokeCount: 2, mistake: "The first stroke loops down and crosses itself.", exampleWord: "みず", exampleRomaji: "mizu", exampleMeaning: "Water" },
      { id: "mu", char: "む", romaji: "mu", strokeCount: 3, mistake: "The loop is on the bottom, followed by a separate dash.", exampleWord: "むし", exampleRomaji: "mushi", exampleMeaning: "Bug" },
      { id: "me", char: "め", romaji: "me", strokeCount: 2, mistake: "Similar to 'nu', but without the final loop.", exampleWord: "めがね", exampleRomaji: "megane", exampleMeaning: "Glasses" },
      { id: "mo", char: "も", romaji: "mo", strokeCount: 3, mistake: "The vertical hook is drawn first, then crossed.", exampleWord: "もの", exampleRomaji: "mono", exampleMeaning: "Thing" },
    ]
  },
  {
    id: "y",
    name: "Y Group",
    chars: [
      { id: "ya", char: "や", romaji: "ya", strokeCount: 3, mistake: "The short dash is on the top right.", exampleWord: "やま", exampleRomaji: "yama", exampleMeaning: "Mountain" },
      { id: "yu", char: "ゆ", romaji: "yu", strokeCount: 2, mistake: "The vertical stroke cuts through the loop.", exampleWord: "ゆき", exampleRomaji: "yuki", exampleMeaning: "Snow" },
      { id: "yo", char: "よ", romaji: "yo", strokeCount: 2, mistake: "The small horizontal line goes first.", exampleWord: "よる", exampleRomaji: "yoru", exampleMeaning: "Night" },
    ]
  },
  {
    id: "r",
    name: "R Group",
    chars: [
      { id: "ra", char: "ら", romaji: "ra", strokeCount: 2, mistake: "The top is a distinct dash, not connected.", exampleWord: "らいしゅう", exampleRomaji: "raishuu", exampleMeaning: "Next week" },
      { id: "ri", char: "り", romaji: "ri", strokeCount: 2, mistake: "The right stroke is longer than the left.", exampleWord: "りんご", exampleRomaji: "ringo", exampleMeaning: "Apple" },
      { id: "ru", char: "る", romaji: "ru", strokeCount: 1, mistake: "Ends with a small loop at the bottom.", exampleWord: "くるま", exampleRomaji: "kuruma", exampleMeaning: "Car" },
      { id: "re", char: "れ", romaji: "re", strokeCount: 2, mistake: "The vertical line is drawn first. Sweeps out at the end.", exampleWord: "れきし", exampleRomaji: "rekishi", exampleMeaning: "History" },
      { id: "ro", char: "ろ", romaji: "ro", strokeCount: 1, mistake: "Like 'ru', but without the final loop.", exampleWord: "ろく", exampleRomaji: "roku", exampleMeaning: "Six" },
    ]
  },
  {
    id: "w_n",
    name: "W & N Group",
    chars: [
      { id: "wa", char: "わ", romaji: "wa", strokeCount: 2, mistake: "Curves inward like a circle at the end.", exampleWord: "わたし", exampleRomaji: "watashi", exampleMeaning: "I / Me" },
      { id: "wo", char: "を", romaji: "wo", strokeCount: 3, mistake: "Used almost exclusively as a particle.", exampleWord: "ほんを", exampleRomaji: "hon wo", exampleMeaning: "Book (object)" },
      { id: "nn", char: "ん", romaji: "n", strokeCount: 1, mistake: "Looks like a cursive 'h'.", exampleWord: "ほん", exampleRomaji: "hon", exampleMeaning: "Book" },
    ]
  }
];
