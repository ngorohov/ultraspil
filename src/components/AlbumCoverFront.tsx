import React from 'react';
import { ALBUM_DATA } from '../data/albumData';
import { ShieldCheck, Flame, Disc3 } from 'lucide-react';

interface Props {
  caseStyle?: 'cd' | 'vinyl' | 'cassette' | 'poster';
  showGlare?: boolean;
  className?: string;
}

export const AlbumCoverFront: React.FC<Props> = ({
  caseStyle = 'cd',
  showGlare = true,
  className = '',
}) => {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-md shadow-2xl transition-all duration-300 aspect-square w-full max-w-[560px] mx-auto bg-stone-900 border border-stone-800 ${className}`}
      id="album-cover-front-render"
    >
      {/* Base Artwork */}
      <img
        src={ALBUM_DATA.frontCoverImage}
        alt="Залетел распил — Обложка альбома"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700"
      />

      {/* Atmospheric Vignette & Grime Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 pointer-events-none" />

      {/* Classic Chanson Decorative Border with Imperial Filigree */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-500/40 pointer-events-none rounded-sm">
        <div className="absolute inset-1 border border-amber-400/20" />
        <div className="absolute top-1 left-1 text-amber-400/70 text-[10px] font-mono leading-none">✠</div>
        <div className="absolute top-1 right-1 text-amber-400/70 text-[10px] font-mono leading-none">✠</div>
        <div className="absolute bottom-1 left-1 text-amber-400/70 text-[10px] font-mono leading-none">✠</div>
        <div className="absolute bottom-1 right-1 text-amber-400/70 text-[10px] font-mono leading-none">✠</div>
      </div>

      {/* TOP HEADER: ALBUM TITLE AS REQUESTED "ЗАЛЕТЕЛ РАСПИЛ" */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 text-center flex flex-col items-center pointer-events-none z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-amber-400" />
          <span className="font-gothic uppercase tracking-[0.25em] text-[10px] sm:text-xs text-amber-300 drop-shadow-md font-bold">
            ОРДЕН УЛЬТРАМАРИНОВ • СЕРИЯ «ШАНСОН ТЕРРЫ»
          </span>
          <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        <h2 className="font-chanson italic tracking-wide text-amber-100/90 text-sm sm:text-base md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Брат Михаил
        </h2>

        <div className="relative mt-0.5 sm:mt-1">
          <h1
            className="font-poster text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
            style={{
              filter: 'drop-shadow(0 2px 0 #78350f) drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))',
              textShadow: '0 3px 6px rgba(0,0,0,0.9)'
            }}
          >
            ЗАЛЕТЕЛ РАСПИЛ
          </h1>
          <div className="mx-auto w-3/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1 shadow-sm" />
        </div>

        <p className="text-[10px] sm:text-xs text-amber-200/80 font-classic mt-1 tracking-widest uppercase">
          Песни 41-го тысячелетия • Акустический альбом
        </p>
      </div>

      {/* AUTHENTIC CHANSON STICKERS & BADGES */}
      <div className="absolute top-28 sm:top-32 left-4 sm:left-6 z-10 pointer-events-none transform -rotate-12">
        <div className="bg-red-950/85 text-red-200 border-2 border-red-500/80 px-2.5 py-1 rounded shadow-lg backdrop-blur-[2px] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-red-400" />
          <span>Одобрено Инквизицией</span>
        </div>
      </div>

      <div className="absolute top-24 sm:top-28 right-4 sm:right-6 z-10 pointer-events-none transform rotate-6">
        <div className="bg-gradient-to-br from-amber-400 to-amber-700 text-stone-950 px-2.5 py-1 rounded-full shadow-xl border border-amber-200/90 text-[9px] sm:text-[10px] font-black uppercase tracking-tight flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-950 fill-amber-950" />
          <span>Шансон Года 40,000</span>
        </div>
      </div>

      {/* Bottom Floating Banner: Chainsword Advisory & Hit Tag */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-4 sm:inset-x-6 flex items-end justify-between pointer-events-none z-10">
        <div className="bg-black/80 backdrop-blur-sm border border-amber-500/50 p-2 sm:p-2.5 rounded text-left max-w-[210px] sm:max-w-[240px] shadow-2xl">
          <p className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-300 font-gothic flex items-center gap-1">
            <Disc3 className="w-3 h-3 text-amber-400 animate-spin-slow" />
            Включает боевой хит:
          </p>
          <p className="text-xs sm:text-sm font-chanson italic text-stone-100 font-semibold leading-tight mt-0.5">
            «Цепной меч-разлука»
          </p>
          <p className="text-[8px] text-stone-400 mt-0.5">и гимн «Кубок Императора»</p>
        </div>

        <div className="bg-stone-950 border-2 border-stone-200 p-1.5 sm:p-2 text-center rounded shadow-2xl max-w-[125px] sm:max-w-[145px]">
          <p className="text-[8px] sm:text-[9px] font-black uppercase text-stone-200 tracking-tighter leading-none">
            ВНИМАНИЕ
          </p>
          <div className="h-[1px] bg-stone-300 my-0.5" />
          <p className="text-[7px] sm:text-[8px] font-semibold text-stone-300 leading-tight">
            СОДЕРЖИТ ЗВУКИ РАБОТАЮЩЕГО ЦЕПНОГО МЕЧА
          </p>
        </div>
      </div>

      {caseStyle === 'cd' && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-5 bg-gradient-to-r from-stone-950/80 via-white/10 to-transparent border-r border-white/20 z-20 pointer-events-none flex flex-col justify-between py-4 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-600/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-stone-600/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-stone-600/60" />
          </div>
          <div className="absolute top-3 left-1 w-2 h-6 bg-white/20 rounded-sm border border-white/30 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-1 w-2 h-6 bg-white/20 rounded-sm border border-white/30 z-20 pointer-events-none" />
        </>
      )}

      {showGlare && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-white/[0.18] pointer-events-none z-30" />
      )}
    </div>
  );
};
