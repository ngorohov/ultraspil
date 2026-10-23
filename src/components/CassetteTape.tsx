import React, { useState } from 'react';
import { TRACKS, ALBUM_DATA } from '../data/albumData';

interface Props {
  isPlaying: boolean;
  activeTrackId: number;
}

export const CassetteTape: React.FC<Props> = ({ isPlaying, activeTrackId }) => {
  const [side, setSide] = useState<'A' | 'B'>('A');

  const sideATracks = TRACKS.slice(0, 3);
  const sideBTracks = TRACKS.slice(3, 6);
  const currentSideTracks = side === 'A' ? sideATracks : sideBTracks;

  return (
    <div className="w-full max-w-[500px] mx-auto bg-stone-900 border-2 border-stone-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl relative select-none">
      {/* Screw holes in 4 corners */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-[7px] text-stone-500 font-mono">+</div>
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-[7px] text-stone-500 font-mono">+</div>
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-[7px] text-stone-500 font-mono">+</div>
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-[7px] text-stone-500 font-mono">+</div>

      {/* Cassette Label Area */}
      <div className="bg-amber-100/90 rounded-lg p-3 sm:p-4 text-stone-900 shadow-inner border border-amber-300 relative overflow-hidden">
        {/* Top brand header */}
        <div className="flex items-center justify-between border-b-2 border-amber-900/60 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-black bg-stone-900 text-amber-200 px-1.5 py-0.5 rounded">
              МК-60-2
            </span>
            <span className="font-mono text-[10px] text-stone-700 font-bold uppercase tracking-wider">
              Стерео • Fe₂O₃
            </span>
          </div>

          {/* Side Switcher */}
          <button
            onClick={() => setSide(side === 'A' ? 'B' : 'A')}
            className="flex items-center gap-1 font-mono text-xs font-black bg-amber-900 hover:bg-amber-800 text-amber-100 px-2 py-0.5 rounded cursor-pointer transition-colors shadow"
          >
            <span>СТОРОНА</span>
            <span className="text-amber-300 text-sm">{side}</span>
            <span className="text-[9px] opacity-70">(сменить)</span>
          </button>
        </div>

        {/* Handwritten Album & Artist Name */}
        <div className="my-2.5 text-center">
          <p className="font-chanson italic text-xs text-stone-600">
            {ALBUM_DATA.artist} ({ALBUM_DATA.chapter})
          </p>
          <h4 className="font-poster text-xl sm:text-2xl text-blue-950 uppercase tracking-wide">
            ЗАЛЕТЕЛ РАСПИЛ
          </h4>
        </div>

        {/* Track listing for current side */}
        <div className="bg-white/80 rounded p-2 border border-amber-300/80 mb-3 text-[11px] font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 text-stone-800">
            {currentSideTracks.map((t) => (
              <div
                key={t.id}
                className={`truncate ${activeTrackId === t.id ? 'font-black text-amber-800 underline' : ''}`}
              >
                {t.id}. {t.title}
              </div>
            ))}
          </div>
        </div>

        {/* Cassette Center Window with Spinning Reels */}
        <div className="bg-stone-900 rounded-lg p-2.5 sm:p-3 border-2 border-stone-700 flex items-center justify-between shadow-inner relative">
          {/* Left Reel */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-800 border-2 border-stone-600 flex items-center justify-center shadow-lg">
            {/* Magnetic tape roll */}
            <div
              className="absolute inset-1 rounded-full bg-amber-950/80 border border-amber-900/40 transition-all duration-500"
              style={{ transform: side === 'A' ? 'scale(0.95)' : 'scale(0.4)' }}
            />
            {/* White Gear with spokes */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-stone-400 flex items-center justify-center relative z-10 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '3s' }}
            >
              <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600" />
              {/* Gear teeth spokes */}
              <div className="absolute w-1 h-3 bg-stone-500 -top-1" />
              <div className="absolute w-1 h-3 bg-stone-500 -bottom-1" />
              <div className="absolute h-1 w-3 bg-stone-500 -left-1" />
              <div className="absolute h-1 w-3 bg-stone-500 -right-1" />
            </div>
          </div>

          {/* Tape window center meter */}
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-[9px] font-mono text-stone-400 tracking-widest uppercase">
              {isPlaying ? '● ВОСПРОИЗВЕДЕНИЕ' : '❚❚ СТОП'}
            </span>
            <div className="w-16 h-1 bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${(activeTrackId / 6) * 100}%` }}
              />
            </div>
            <span className="text-[8px] font-mono text-amber-500">
              ТРЕК {activeTrackId} ИЗ 6
            </span>
          </div>

          {/* Right Reel */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-stone-800 border-2 border-stone-600 flex items-center justify-center shadow-lg">
            {/* Magnetic tape roll */}
            <div
              className="absolute inset-1 rounded-full bg-amber-950/80 border border-amber-900/40 transition-all duration-500"
              style={{ transform: side === 'A' ? 'scale(0.45)' : 'scale(0.9)' }}
            />
            {/* White Gear with spokes */}
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-stone-400 flex items-center justify-center relative z-10 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '3s' }}
            >
              <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-600" />
              <div className="absolute w-1 h-3 bg-stone-500 -top-1" />
              <div className="absolute w-1 h-3 bg-stone-500 -bottom-1" />
              <div className="absolute h-1 w-3 bg-stone-500 -left-1" />
              <div className="absolute h-1 w-3 bg-stone-500 -right-1" />
            </div>
          </div>
        </div>

        {/* Bottom Tape Info */}
        <div className="mt-2 text-center text-[9px] font-mono text-stone-600">
          Сделано в Сегментуме Солар • Магнитная лента высшего качества «Аквила»
        </div>
      </div>
    </div>
  );
};
