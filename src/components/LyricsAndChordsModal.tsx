import React, { useState } from 'react';
import { TRACKS, CHORD_MAP } from '../data/albumData';
import { X, Copy, Check, Guitar, Music, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTrackId: number;
  onSelectTrack: (id: number) => void;
  currentTime: number;
}

export const LyricsAndChordsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedTrackId,
  onSelectTrack,
  currentTime,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFretboards, setShowFretboards] = useState(true);

  if (!isOpen) return null;

  const currentTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];

  const handleCopy = () => {
    const textToCopy = [
      `Брат Михаил (Орден Ультрамаринов) — ${currentTrack.title}`,
      `Тональность: ${currentTrack.key} | Аккорды: ${currentTrack.chords.join(', ')}`,
      '',
      ...currentTrack.lyrics.map(l => `${l.chord ? `[${l.chord}] ` : ''}${l.text}`)
    ].join('\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-600/50 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-chanson text-lg sm:text-xl font-bold text-amber-100">
                Песенник 41-го тысячелетия
              </h3>
              <p className="text-xs text-stone-400 font-classic">
                Слова и аккорды для акустической гитары с благословением Омниссии
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg border border-stone-700 transition-colors cursor-pointer"
              title="Скопировать текст и аккорды"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-950/40 border-b border-stone-800/80 overflow-x-auto scrollbar-thin">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-chanson transition-all cursor-pointer border ${
                track.id === selectedTrackId
                  ? 'bg-amber-600/30 text-amber-200 border-amber-500/70 font-bold shadow'
                  : 'bg-stone-800/50 text-stone-400 border-transparent hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              <span className="font-mono mr-1 text-amber-400/80">{track.id}.</span>
              {track.title}
            </button>
          ))}
        </div>

        {/* Main Content: Lyrics & Chords */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Song Info Card */}
          <div className="bg-stone-950/70 border border-stone-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono text-amber-500 font-bold">
                Трек #{currentTrack.id}
              </span>
              <h2 className="text-2xl font-poster text-amber-100 uppercase tracking-wide">
                {currentTrack.title}
              </h2>
              <p className="text-xs font-classic text-stone-300 italic mt-1">
                {currentTrack.synopsis}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFretboards(!showFretboards)}
                className="flex items-center gap-1 text-xs bg-amber-950/40 border border-amber-600/50 text-amber-300 px-2.5 py-1.5 rounded-md hover:bg-amber-950/60 cursor-pointer"
              >
                <Guitar className="w-3.5 h-3.5" />
                <span>{showFretboards ? 'Скрыть схемы аккордов' : 'Показать схемы'}</span>
              </button>
            </div>
          </div>

          {/* Fretboard chord visualizer */}
          {showFretboards && (
            <div className="bg-stone-950/90 border border-amber-900/40 rounded-lg p-3.5">
              <h4 className="text-xs font-gothic uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5" />
                <span>Аккорды для гитары:</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {currentTrack.chords.map((chord) => {
                  const chordInfo = CHORD_MAP[chord];
                  return (
                    <div
                      key={chord}
                      className="bg-stone-900 border border-stone-700/80 rounded-md p-2 text-center"
                    >
                      <span className="font-mono font-black text-amber-300 text-sm">{chord}</span>
                      <p className="text-[9px] text-stone-400 mt-0.5 truncate" title={chordInfo?.label}>
                        {chordInfo?.label || 'Каноничный аккорд'}
                      </p>
                      {chordInfo && (
                        <div className="text-[8px] font-mono text-stone-500 mt-1 bg-black/40 py-0.5 rounded">
                          {chordInfo.fingers}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lyrics with chords placed above */}
          <div className="space-y-4 font-mono text-sm leading-relaxed bg-stone-950/40 border border-stone-800/80 rounded-lg p-5">
            {currentTrack.lyrics.map((line, idx) => {
              const isChorus = line.isChorus;
              const isCurrent = currentTime >= line.time && (
                idx === currentTrack.lyrics.length - 1 || currentTime < currentTrack.lyrics[idx + 1].time
              );

              return (
                <div
                  key={idx}
                  className={`transition-all duration-300 pl-3 border-l-2 ${
                    isCurrent
                      ? 'border-amber-400 bg-amber-500/10 py-1 rounded-r font-bold'
                      : isChorus
                      ? 'border-amber-700/60 pl-4 py-0.5 text-amber-100/90'
                      : 'border-transparent text-stone-300'
                  }`}
                >
                  {line.chord && (
                    <span className="inline-block font-mono text-xs font-black text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded mr-2 mb-1 border border-amber-600/40">
                      {line.chord}
                    </span>
                  )}
                  <span className={`font-chanson ${isChorus ? 'italic text-amber-200' : ''}`}>
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Lore footnote */}
          <div className="p-3 bg-amber-950/30 border border-amber-600/30 rounded-lg text-xs text-amber-200/80 font-classic">
            <span className="font-bold text-amber-400">Памятка космодесантника:</span> Во время исполнения
            шансонных куплетов цепной меч следует держать на предохранителе, во избежание непреднамеренного
            распила собутыльников и музыкальных инструментов.
          </div>
        </div>
      </div>
    </div>
  );
};
