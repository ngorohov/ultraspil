import { useState } from 'react';
import { ALBUM_DATA, TRACKS } from './data/albumData';
import { AlbumCoverFront } from './components/AlbumCoverFront';
import { AlbumCoverBack } from './components/AlbumCoverBack';
import { CassetteTape } from './components/CassetteTape';
import { ChansonAudioPlayer } from './components/ChansonAudioPlayer';
import { LyricsAndChordsModal } from './components/LyricsAndChordsModal';
import { ExportModal } from './components/ExportModal';
import { audioEngine } from './utils/audioEngine';
import {
  RotateCw,
  Sparkles,
  Download,
  BookOpen,
  Disc,
  Radio,
  Flame,
  Volume2,
  Skull,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'front' | 'back' | 'flip' | 'cassette'>('flip');
  const [isFlipped, setIsFlipped] = useState(false);
  const [caseStyle, setCaseStyle] = useState<'cd' | 'vinyl' | 'poster'>('cd');
  const [showGlare, setShowGlare] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync state with audio engine
  audioEngine.onStateChange = (playing) => setIsPlaying(playing);
  audioEngine.onTimeUpdate = (time) => setCurrentTime(time);

  const handleSelectTrack = (id: number) => {
    setCurrentTrackId(id);
    const track = TRACKS.find((t) => t.id === id);
    if (track) {
      audioEngine.setTrack(track.progression, track.tempo, track.meter);
      audioEngine.play();
    }
  };

  const currentTrack = TRACKS.find((t) => t.id === currentTrackId) || TRACKS[0];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Banner / Navigation */}
      <header className="border-b border-amber-900/40 bg-stone-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black shadow-lg shadow-amber-600/20 font-poster text-xl">
              У
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-gothic uppercase tracking-[0.2em] text-[10px] text-amber-400 font-bold">
                  УЛЬТРА-ШАНСОН
                </span>
                <span className="text-[10px] bg-red-900/60 text-red-200 border border-red-700/60 px-1 rounded font-mono">
                  WARHAMMER 40K
                </span>
              </div>
              <h1 className="font-poster text-base sm:text-lg tracking-wider text-amber-100 uppercase">
                Залетел распил <span className="font-chanson italic font-normal text-xs text-stone-400">— Брат Михаил</span>
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLyricsOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-amber-950/50 hover:bg-amber-900/60 text-amber-200 border border-amber-600/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Тексты и аккорды</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-stone-950" />
              <span className="hidden sm:inline">Скачать обложку</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Presentation */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Intro Tagline */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-classic">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Шедевр кабацкой лирики 41-го тысячелетия</span>
          </div>
          <h2 className="font-poster text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase tracking-wide">
            Альбом «Залетел распил»
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-chanson italic max-w-xl mx-auto">
            Ультрамарин за столом, верный цепной меч наготове, кружка амасека и шесть душевных песен
            о нелегкой службе Императору Человечества.
          </p>
        </div>

        {/* View Switchers & Options Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/60 border border-stone-800 p-2.5 rounded-xl">
          {/* Switch View Mode */}
          <div className="flex items-center gap-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800">
            <button
              onClick={() => setViewMode('flip')}
              className={`px-3 py-1.5 rounded-md text-xs font-classic transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'flip'
                  ? 'bg-amber-600 text-white font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>3D Кейс</span>
            </button>

            <button
              onClick={() => setViewMode('front')}
              className={`px-3 py-1.5 rounded-md text-xs font-classic transition-all cursor-pointer ${
                viewMode === 'front'
                  ? 'bg-amber-600 text-white font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Лицевая сторона
            </button>

            <button
              onClick={() => setViewMode('back')}
              className={`px-3 py-1.5 rounded-md text-xs font-classic transition-all cursor-pointer ${
                viewMode === 'back'
                  ? 'bg-amber-600 text-white font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Трек-лист (Задник)
            </button>

            <button
              onClick={() => setViewMode('cassette')}
              className={`px-3 py-1.5 rounded-md text-xs font-classic transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cassette'
                  ? 'bg-amber-600 text-white font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Кассета</span>
            </button>
          </div>

          {/* Toggles: Case Style & Glare */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCaseStyle(caseStyle === 'cd' ? 'poster' : 'cd')}
              className="text-xs px-2.5 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 cursor-pointer flex items-center gap-1"
            >
              <Disc className="w-3.5 h-3.5 text-amber-400" />
              <span>Формат: {caseStyle === 'cd' ? 'CD Jewel Box' : 'Постер без рамки'}</span>
            </button>

            <button
              onClick={() => setShowGlare(!showGlare)}
              className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
                showGlare
                  ? 'bg-amber-950/40 border-amber-600/50 text-amber-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Блики пластика</span>
            </button>
          </div>
        </div>

        {/* Main Display Grid: Cover + Tracks Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Column: Album Cover Presentation */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {viewMode === 'flip' && (
              <div className="w-full flex flex-col items-center">
                {/* 3D Flip Container */}
                <div className="w-full perspective-1000">
                  <div
                    className={`relative w-full max-w-[540px] aspect-square mx-auto transition-transform duration-700 preserve-3d cursor-pointer ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                    onClick={() => setIsFlipped(!isFlipped)}
                    title="Нажмите, чтобы перевернуть коробку диска"
                  >
                    {/* Front Face */}
                    <div className="absolute inset-0 backface-hidden">
                      <AlbumCoverFront caseStyle={caseStyle} showGlare={showGlare} />
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180">
                      <AlbumCoverBack
                        caseStyle={caseStyle}
                        showGlare={showGlare}
                        activeTrackId={currentTrackId}
                        isPlaying={isPlaying}
                        onSelectTrack={handleSelectTrack}
                      />
                    </div>
                  </div>
                </div>

                {/* Flip control hint */}
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="mt-4 flex items-center gap-2 text-xs bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/40 px-4 py-2 rounded-full shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>
                    {isFlipped
                      ? 'Показать лицевую обложку «Залетел распил»'
                      : 'Перевернуть на задник со списком треков'}
                  </span>
                </button>
              </div>
            )}

            {viewMode === 'front' && (
              <div className="w-full flex flex-col items-center">
                <AlbumCoverFront caseStyle={caseStyle} showGlare={showGlare} />
                <p className="mt-3 text-xs text-stone-400 font-classic">
                  Лицевая обложка альбома: Брат Михаил, цепной меч, амасек и акустическая гитара
                </p>
              </div>
            )}

            {viewMode === 'back' && (
              <div className="w-full flex flex-col items-center">
                <AlbumCoverBack
                  caseStyle={caseStyle}
                  showGlare={showGlare}
                  activeTrackId={currentTrackId}
                  isPlaying={isPlaying}
                  onSelectTrack={handleSelectTrack}
                />
                <p className="mt-3 text-xs text-stone-400 font-classic">
                  Задняя сторона с официальным трек-листом из 6 композиций и реквизитами
                </p>
              </div>
            )}

            {viewMode === 'cassette' && (
              <div className="w-full flex flex-col items-center py-4">
                <CassetteTape isPlaying={isPlaying} activeTrackId={currentTrackId} />
                <p className="mt-4 text-xs text-stone-400 font-classic">
                  Кассета стандарта МК-60-2 со встроенным вращением катушек при воспроизведении
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Tracklist & Current Song Info */}
          <div className="lg:col-span-5 space-y-4">
            {/* Header for Tracklist */}
            <div className="bg-stone-900/90 border border-amber-600/40 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Skull className="w-4 h-4 text-amber-400" />
                  <h3 className="font-gothic uppercase tracking-wider text-xs sm:text-sm font-bold text-amber-200">
                    Трек-лист альбома (6 треков)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-stone-400">
                  Одобрено Экклезиархией
                </span>
              </div>

              {/* The 6 tracks list */}
              <div className="space-y-2">
                {TRACKS.map((track) => {
                  const isActive = track.id === currentTrackId;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handleSelectTrack(track.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-amber-950/70 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-800/50 hover:border-amber-600/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${
                            isActive
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {isActive && isPlaying ? (
                            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          ) : (
                            track.id
                          )}
                        </div>

                        <div className="truncate">
                          <p
                            className={`font-chanson text-sm truncate ${
                              isActive ? 'font-bold text-amber-100' : 'text-stone-300'
                            }`}
                          >
                            {track.title}
                          </p>
                          <p className="text-[11px] text-stone-400 font-classic truncate">
                            {track.synopsis}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="font-mono text-xs text-amber-400/90 font-semibold block">
                          {track.duration}
                        </span>
                        <span className="text-[9px] text-stone-500 font-mono">
                          {track.meter}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Currently Playing Card with Synopsis */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Текущая песня:
                </span>
                <span className="text-xs bg-stone-950 px-2 py-0.5 rounded text-amber-300 font-mono border border-stone-800">
                  Тональность: {currentTrack.key}
                </span>
              </div>

              <div>
                <h4 className="font-poster text-lg text-amber-100 uppercase">
                  {currentTrack.id}. {currentTrack.title}
                </h4>
                <p className="text-xs text-stone-300 font-classic mt-1 leading-relaxed">
                  {currentTrack.synopsis}
                </p>
              </div>

              {/* Live Lyrics Preview snippet */}
              <div className="bg-stone-950/70 p-3 rounded-lg border border-amber-900/30 font-chanson italic text-xs text-amber-200/90 leading-relaxed">
                «{currentTrack.lyrics[0]?.text}»
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setIsLyricsOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline font-classic cursor-pointer"
                >
                  Читать весь текст и аккорды →
                </button>
                <span className="text-[10px] text-stone-500 font-mono">
                  Аккорды: {currentTrack.chords.join(' • ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chanson Audio Player Component */}
        <section className="pt-2">
          <ChansonAudioPlayer
            currentTrackId={currentTrackId}
            onTrackChange={(id) => handleSelectTrack(id)}
            onOpenLyrics={() => setIsLyricsOpen(true)}
          />
        </section>

        {/* Lore & Story Behind the Album */}
        <section className="bg-stone-900/50 border border-stone-800 rounded-xl p-5 sm:p-6 space-y-4">
          <h3 className="font-gothic uppercase tracking-wider text-base font-bold text-amber-300 flex items-center gap-2">
            <span>✠</span> ИСТОРИЯ СОЗДАНИЯ АЛЬБОМА «ЗАЛЕТЕЛ РАСПИЛ»
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-300 font-classic leading-relaxed">
            <div className="bg-stone-950/60 p-4 rounded-lg border border-stone-800/80 space-y-2">
              <h4 className="font-bold text-amber-200 font-chanson text-base">
                1. Макраггская тоска
              </h4>
              <p>
                Брат Михаил, ветеран сотен планетарных десантов, в перерывах меж свирепыми битвами
                брал старенькую шестиструнную акустику. Струны из моноволокна и дека из карельской сосны
                с древней Терры помогли родиться неповторимому жанру космодесантного шансона.
              </p>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-lg border border-stone-800/80 space-y-2">
              <h4 className="font-bold text-amber-200 font-chanson text-base">
                2. Тот самый цепной меч
              </h4>
              <p>
                Знаменитый цепной меч «Викторум» на обложке — не просто бутафория. Его мерный холостой
                рокот записан в качестве перкуссионной партии на заглавной песне «Залетел распил» и
                душераздирающей балладе «Цепной меч-разлука».
              </p>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-lg border border-stone-800/80 space-y-2">
              <h4 className="font-bold text-amber-200 font-chanson text-base">
                3. Признание на Терре
              </h4>
              <p>
                Альбом разошелся тиражом свыше 40 миллиардов копий на инфокристаллах и аудиокассетах
                по всем Сегментумам. Песня «Кубок Императора» стала неофициальным застольным гимном
                от полков Астра Милитарум до кают вольных торговцев.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-6 text-center text-xs text-stone-500 font-classic">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="text-stone-400">
            «Залетел распил» — Музыкальный альбом в жанре Warhammer 40,000 Chanson
          </p>
          <p className="text-[11px] text-stone-600 font-mono">
            {ALBUM_DATA.label} • {ALBUM_DATA.catalogNumber} • Во славу Императора Человечества
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LyricsAndChordsModal
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        selectedTrackId={currentTrackId}
        onSelectTrack={(id) => handleSelectTrack(id)}
        currentTime={currentTime}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
