export interface Track {
  id: number;
  title: string;
  duration: string;
  durationSec: number;
  key: string;
  tempo: number;
  meter: string;
  chords: string[];
  progression: Array<{ chord: string; beats: number }>;
  synopsis: string;
  lyrics: Array<{ time: number; chord?: string; text: string; isChorus?: boolean }>;
}

export interface AlbumInfo {
  title: string;
  artist: string;
  chapter: string;
  releaseYear: string;
  label: string;
  catalogNumber: string;
  frontCoverImage: string;
  backCoverImage: string;
  description: string;
  curatorNote: string;
}

export const ALBUM_DATA: AlbumInfo = {
  title: "Залетел распил",
  artist: "Брат Михаил",
  chapter: "Орден Ультрамаринов (XIII Легион)",
  releaseYear: "M41.993",
  label: "Ультра-Шансон Рекордс / Голос Макрагга",
  catalogNumber: "UM-40000-RASPIL-CD",
  frontCoverImage: "/src/assets/images/chanson_marine_front_1792762506817.jpg",
  backCoverImage: "/src/assets/images/chanson_back_art_1792762507783.jpg",
  description: "Главный душевный хит Сегментума Солар. Альбом о солдатской тоске, верности Кодексу Астартес, нелегкой доле в окопах дальних миров и родном звуке двухтактного цепного меча.",
  curatorNote: "Записано в походной кантине 2-й роты после зачистки улья на Таросе. Каждая струна закалена плазмой, каждый аккорд благословлен техножрецами."
};

export const TRACKS: Track[] = [
  {
    id: 1,
    title: "Залетел распил",
    duration: "03:42",
    durationSec: 222,
    key: "Am",
    tempo: 104,
    meter: "4/4",
    chords: ["Am", "Dm", "E7", "C", "G"],
    progression: [
      { chord: "Am", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "E7", beats: 4 },
      { chord: "Am", beats: 4 },
      { chord: "C", beats: 4 },
      { chord: "G", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "E7", beats: 4 },
    ],
    synopsis: "Заглавный трек альбома: баллада о том, как верный цепной меч входит в броню еретика, словно нож в макраггское масло.",
    lyrics: [
      { time: 0, chord: "Am", text: "Снова вечер опустился над казармой боевой," },
      { time: 6, chord: "Dm", text: "Дождь кислотный барабанит по обшивке головной." },
      { time: 12, chord: "E7", text: "На столе стакан граненый с амасеком пополам," },
      { time: 18, chord: "Am", text: "Передайте, братья, песню всем окопным пацанам." },
      { time: 24, chord: "C", text: "Мы держали перекресток двести суток напролет," },
      { time: 30, chord: "G", text: "А навстречу пер безбожно хаоситский пулемет." },
      { time: 36, chord: "Dm", text: "Но сержант нажал тумблер — и взревел стальной мотор," },
      { time: 42, chord: "E7", text: "И пошел с врагами вечный, задушевный разговор!" },
      { time: 48, chord: "Am", isChorus: true, text: "Эх, залетел распил по самое нутро!" },
      { time: 54, chord: "Dm", isChorus: true, text: "Зубья вгрызлись в керамит весело, хитро!" },
      { time: 60, chord: "E7", isChorus: true, text: "Застонали шестеренки, брызнуло масло," },
      { time: 66, chord: "Am", isChorus: true, text: "В кантине нашей тихой снова стало светло!" },
      { time: 72, chord: "Dm", isChorus: true, text: "Залетел распил — и искры в темноте!" },
      { time: 78, chord: "Am", isChorus: true, text: "Мы присягу отдавали на святом щите!" },
      { time: 84, chord: "E7", isChorus: true, text: "Ультрамарин сидит с гитарой, да слезу утрет," },
      { time: 90, chord: "Am", isChorus: true, text: "А распил в груди еретика поет и поет!" },
    ]
  },
  {
    id: 2,
    title: "Броня моя",
    duration: "04:15",
    durationSec: 255,
    key: "Em",
    tempo: 96,
    meter: "4/4",
    chords: ["Em", "Am", "B7", "C", "D"],
    progression: [
      { chord: "Em", beats: 4 },
      { chord: "Am", beats: 4 },
      { chord: "B7", beats: 4 },
      { chord: "Em", beats: 4 },
      { chord: "C", beats: 4 },
      { chord: "D", beats: 4 },
      { chord: "Am", beats: 4 },
      { chord: "B7", beats: 4 },
    ],
    synopsis: "Трогательная ода силовой броне «Марк X Тактикус». Верная напарница десантника, выдержавшая сотни осад.",
    lyrics: [
      { time: 0, chord: "Em", text: "Синий цвет ультрамаринский, золотая окантовка," },
      { time: 6, chord: "Am", text: "Ты спасала сотни раз меня в жестоких потасовках." },
      { time: 12, chord: "B7", text: "Сколько вмятин от шрапнели на широкой грудине," },
      { time: 18, chord: "Em", text: "Сколько крови запеклось на священной броне..." },
      { time: 24, chord: "C", isChorus: true, text: "Броня моя, вторая кожа, матерь из адамантия," },
      { time: 30, chord: "D", isChorus: true, text: "На плече висит печать от нашего аббата." },
      { time: 36, chord: "Am", isChorus: true, text: "Ты не плачь, сервопривод, не гуди в тишине," },
      { time: 42, chord: "B7", isChorus: true, text: "Завтра снова на штурм мы пойдем по весне!" },
      { time: 48, chord: "Em", isChorus: true, text: "Броня моя... на далекой войне..." },
    ]
  },
  {
    id: 3,
    title: "Кубок Императора",
    duration: "03:58",
    durationSec: 238,
    key: "Dm",
    tempo: 112,
    meter: "3/4",
    chords: ["Dm", "Gm", "A7", "F", "C"],
    progression: [
      { chord: "Dm", beats: 3 },
      { chord: "Gm", beats: 3 },
      { chord: "A7", beats: 3 },
      { chord: "Dm", beats: 3 },
      { chord: "F", beats: 3 },
      { chord: "C", beats: 3 },
      { chord: "Gm", beats: 3 },
      { chord: "A7", beats: 3 },
    ],
    synopsis: "Застольный гимн ветеранов космодесанта. Поднятие помятых оловянных кружек за тех, кто остался на Истваане и Кадии.",
    lyrics: [
      { time: 0, chord: "Dm", text: "Наливай, трактирщик хмурый, амасек нам фронтовой," },
      { time: 6, chord: "Gm", text: "Нынче третий взвод вернулся на заслуженный покой." },
      { time: 12, chord: "A7", text: "Черепа на эполетах, на шевронах копоть битв," },
      { time: 18, chord: "Dm", text: "Начинаем наш молебен из проверенных молитв." },
      { time: 24, chord: "F", isChorus: true, text: "Кубок Императора поднимем до небес!" },
      { time: 30, chord: "C", isChorus: true, text: "Пусть трепещет в ужасе богомерзкий бес!" },
      { time: 36, chord: "Gm", isChorus: true, text: "За десант, за Терру, за родной Макрагг!" },
      { time: 42, chord: "A7", isChorus: true, text: "Выпьем так, чтоб вздрогнул супостат и враг!" },
      { time: 48, chord: "Dm", isChorus: true, text: "Пей до дна, братуха, не считай утрат!" },
    ]
  },
  {
    id: 4,
    title: "Цепной меч-разлука",
    duration: "05:10",
    durationSec: 310,
    key: "Am",
    tempo: 88,
    meter: "4/4",
    chords: ["Am", "Dm", "G", "C", "F", "E7"],
    progression: [
      { chord: "Am", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "G", beats: 4 },
      { chord: "C", beats: 4 },
      { chord: "F", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "E7", beats: 4 },
      { chord: "Am", beats: 4 },
    ],
    synopsis: "Эпическая душераздирающая шансон-баллада. О верном друге — двуручном цепном мече, который отделяет жизнь от вечности.",
    lyrics: [
      { time: 0, chord: "Am", text: "Ты лежишь на дубовом столе передо мной," },
      { time: 6, chord: "Dm", text: "С патиной вековой и зубчатой каймой." },
      { time: 12, chord: "G", text: "Тяжелеет ладонь в боевой рукавице," },
      { time: 18, chord: "C", text: "И родной Макрагг по ночам только снится..." },
      { time: 24, chord: "F", isChorus: true, text: "Цепной меч-разлука, моторная грусть," },
      { time: 30, chord: "Dm", isChorus: true, text: "Я к девицам мирным уже не вернусь." },
      { time: 36, chord: "E7", isChorus: true, text: "Ты взревешь на рассвете, проснется орда," },
      { time: 42, chord: "Am", isChorus: true, text: "И покатится с плеч черных звезд череда." },
      { time: 48, chord: "F", isChorus: true, text: "Режь печаль мою, старший брат зубчатый," },
      { time: 54, chord: "E7", isChorus: true, text: "Мы с тобой навек к ордену прижаты..." },
    ]
  },
  {
    id: 5,
    title: "Траншеи да черепа",
    duration: "04:22",
    durationSec: 262,
    key: "Hm",
    tempo: 100,
    meter: "4/4",
    chords: ["Hm", "Em", "F#7", "G", "A"],
    progression: [
      { chord: "Hm", beats: 4 },
      { chord: "Em", beats: 4 },
      { chord: "F#7", beats: 4 },
      { chord: "Hm", beats: 4 },
      { chord: "G", beats: 4 },
      { chord: "A", beats: 4 },
      { chord: "Em", beats: 4 },
      { chord: "F#7", beats: 4 },
    ],
    synopsis: "Грибоедовская окопная хроника. Липкая грязь Армагеддона, колючая проволока и вечный покой павших гвардейцев.",
    lyrics: [
      { time: 0, chord: "Hm", text: "Мимо часовых в промозглый рассвет," },
      { time: 6, chord: "Em", text: "Здесь уже шестой сменяется век." },
      { time: 12, chord: "F#7", text: "Ни травы зеленой, ни синих озер," },
      { time: 18, chord: "Hm", text: "Лишь тяжелый вал да колючий забор." },
      { time: 24, chord: "G", isChorus: true, text: "Траншеи да черепа, до горизонта ров," },
      { time: 30, chord: "A", isChorus: true, text: "Здесь пролита тоннами верная кровь." },
      { time: 36, chord: "Em", isChorus: true, text: "Но держится намертво космодесант," },
      { time: 42, chord: "F#7", isChorus: true, text: "Пока на Макрагге звенит колокол-грант!" },
      { time: 48, chord: "Hm", isChorus: true, text: "Траншеи да черепа... наш дом родной." },
    ]
  },
  {
    id: 6,
    title: "Прощай, комиссар",
    duration: "04:48",
    durationSec: 288,
    key: "Am",
    tempo: 92,
    meter: "4/4",
    chords: ["Am", "Dm", "E7", "F", "C"],
    progression: [
      { chord: "Am", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "E7", beats: 4 },
      { chord: "Am", beats: 4 },
      { chord: "F", beats: 4 },
      { chord: "C", beats: 4 },
      { chord: "Dm", beats: 4 },
      { chord: "E7", beats: 4 },
    ],
    synopsis: "Финальная баллада альбома. Прощание с боевым комиссаром, который повел полк в последнюю штыковую атаку.",
    lyrics: [
      { time: 0, chord: "Am", text: "Ты фуражку снял, оглядел бойцов," },
      { time: 6, chord: "Dm", text: "Среди нас не встретить пустых юнцов." },
      { time: 12, chord: "E7", text: "Ты сказал: 'Ни шагу! За нами Терра!'," },
      { time: 18, chord: "Am", text: "И спасла полки вековая вера." },
      { time: 24, chord: "F", isChorus: true, text: "Прощай, комиссар, спи спокойно в пыли," },
      { time: 30, chord: "C", isChorus: true, text: "Твой болт-пистолет мы с собой унесли." },
      { time: 36, chord: "Dm", isChorus: true, text: "Мы выбьем врагов из траншей и домов," },
      { time: 42, chord: "E7", isChorus: true, text: "Под грозный распил ультрамаринских клинов!" },
      { time: 48, chord: "Am", isChorus: true, text: "Прощай, комиссар... спи спокойно, герой." },
    ]
  }
];

export const CHORD_MAP: Record<string, { frets: number[]; fingers: string; label: string }> = {
  Am: { frets: [-1, 0, 2, 2, 1, 0], fingers: "x 0 2 3 1 0", label: "Ля минор (блатная классика)" },
  Dm: { frets: [-1, -1, 0, 2, 3, 1], fingers: "x x 0 2 3 1", label: "Ре минор (кабацкий плач)" },
  E7: { frets: [0, 2, 0, 1, 0, 0], fingers: "0 2 0 1 0 0", label: "Ми септаккорд (нерв шансона)" },
  C: { frets: [-1, 3, 2, 0, 1, 0], fingers: "x 3 2 0 1 0", label: "До мажор (луч надежды)" },
  G: { frets: [3, 2, 0, 0, 0, 3], fingers: "3 2 0 0 0 4", label: "Соль мажор (терранский)" },
  Em: { frets: [0, 2, 2, 0, 0, 0], fingers: "0 2 3 0 0 0", label: "Ми минор (керамитовая грусть)" },
  B7: { frets: [-1, 2, 1, 2, 0, 2], fingers: "x 2 1 3 0 4", label: "Си септаккорд (масло в редукторе)" },
  F: { frets: [1, 3, 3, 2, 1, 1], fingers: "1 3 4 2 1 1", label: "Фа мажор (баррэ космодесанта)" },
  Gm: { frets: [3, 5, 5, 3, 3, 3], fingers: "1 3 4 1 1 1", label: "Соль минор (горечь амасека)" },
  A7: { frets: [-1, 0, 2, 0, 2, 0], fingers: "x 0 2 0 3 0", label: "Ля септаккорд (гусарский размах)" },
  Hm: { frets: [-1, 2, 4, 4, 3, 2], fingers: "x 1 3 4 2 1", label: "Си минор (окопная тоска)" },
  "F#7": { frets: [2, 4, 2, 3, 2, 2], fingers: "1 3 1 2 1 1", label: "Фа-диез септ (искры из-под цепи)" },
  D: { frets: [-1, -1, 0, 2, 3, 2], fingers: "x x 0 1 3 2", label: "Ре мажор (боевой марш)" },
  A: { frets: [-1, 0, 2, 2, 2, 0], fingers: "x 0 1 2 3 0", label: "Ля мажор (триумф на Терре)" }
};
