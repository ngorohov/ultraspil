import React from 'react';
import { TRACKS, ALBUM_DATA } from '../data/albumData';
import { Play, Volume2 } from 'lucide-react';

interface Props {
  caseStyle?: 'cd' | 'vinyl' | 'cassette' | 'poster';
  showGlare?: boolean;
  activeTrackId?: number;
  isPlaying?: boolean;
  onSelectTrack?: (id: number) => void;
  className?: string;
}

export const AlbumCoverBack: React.FC<Props> = ({
  caseStyle = 'cd',
  showGlare = true,
  activeTrackId = 1,
  isPlaying = false,
  onSelectTrack,
  className = '',
}) => {
  return (
    <div
      className={`relative select-none overflow-hidden rounded-md shadow-2xl transition-all duration-300 aspect-square w-full max-w-[560px] mx-auto bg-stone-950 border border-stone-800 ${className}`}
      id="album-cover-back-render"
    >
      {/* Background artwork */}
      <img
        src={ALBUM_DATA.backCoverImage}
        alt="Залетел распил — Задняя сторона обложки"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center filter brightness-40 contrast-125"
      />

      {/* Grimy overlay & dark parchment backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/90 pointer-events-none" />

      {/* Ornate Gold Border */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-600/40 rounded pointer-events-none">
        <div className="absolute inset-1 border border-amber-500/20" />
      </div>

      <div className="absolute inset-4 sm:inset-6 flex flex-col justify-between z-10">
        {/* Top Header */}
        <div className="text-center border-b border-amber-500/30 pb-2">
          <p className="text-[10px] font-gothic tracking-[0.25em] text-amber-400 uppercase font-semibold">
            {ALBUM_DATA.chapter}
          </p>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="text-stone-300 font-chanson italic text-base sm:text-lg">
              {ALBUM_DATA.artist}
            </span>
            <span className="text-amber-500">•</span>
            <h2 className="font-poster text-amber-300 text-lg sm:text-xl tracking-wider uppercase">
              «{ALBUM_DATA.title}»
            </h2>
          </div>
          <p className="text-[9px] text-stone-400 font-mono mt-0.5">
            Каталог: {ALBUM_DATA.catalogNumber} • Год выпуска: {ALBUM_DATA.releaseYear}
          </p>
        </div>

        {/* TRACKLIST CONTAINER - Exactly the 6 requested tracks */}
        <div className="my-auto py-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-gothic tracking-widest text-amber-400 uppercase font-bold flex items-center gap-1">
              <span>✠</span> СПИСОК ТРЕКОВ АЛЬБОМА
            </span>
            <span className="text-[9px] text-amber-500/80 font-mono">
              [ 6 ТРЕКОВ • 26:15 ]
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            {TRACKS.map((track) => {
              const isActive = activeTrackId === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => onSelectTrack?.(track.id)}
                  className={`group flex items-center justify-between px-2.5 sm:px-3 py-1.5 rounded transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-amber-950/60 border-amber-500/60 shadow-md text-amber-100'
                      : 'bg-stone-900/60 border-stone-800/80 hover:bg-stone-800/60 hover:border-amber-600/40 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                    {/* Track Number / Play state icon */}
                    <div className="w-5 text-center flex-shrink-0">
                      {isActive && isPlaying ? (
                        <Volume2 className="w-4 h-4 text-amber-400 animate-pulse mx-auto" />
                      ) : (
                        <span className="font-mono text-xs text-amber-400/90 font-bold group-hover:hidden">
                          {track.id}.
                        </span>
                      )}
                      <Play className="w-3.5 h-3.5 text-amber-400 hidden group-hover:block mx-auto" />
                    </div>

                    {/* Track Name */}
                    <div className="text-left truncate">
                      <span className={`text-xs sm:text-sm font-chanson tracking-wide ${
                        isActive ? 'text-amber-200 font-bold' : 'group-hover:text-amber-200'
                      }`}>
                        {track.title}
                      </span>
                      {track.id === 1 && (
                        <span className="ml-1.5 text-[8px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 py-0.2 rounded font-mono">
                          ХИТ
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chords & Duration */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="hidden sm:inline-block text-[9px] text-stone-400 font-mono bg-stone-950/70 px-1.5 py-0.5 rounded border border-stone-800">
                      {track.chords.slice(0, 3).join('-')}
                    </span>
                    <span className="font-mono text-xs text-stone-400 group-hover:text-amber-300">
                      {track.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM METADATA, CREDITS & BARCODE */}
        <div className="border-t border-amber-500/30 pt-2 space-y-2">
          {/* Production Notes */}
          <div className="text-[8px] sm:text-[9px] text-stone-400/90 font-classic space-y-0.5 text-center">
            <p className="leading-tight">
              Брат Михаил — вокал, 6-струнная акустика, цепной привод. Хор сервиторов — бэк-вокал.
            </p>
            <p className="text-stone-500 leading-tight">
              Запись произведена полевой звукозаписывающей станцией на редутах Сегментума Солар.
            </p>
          </div>

          {/* Barcode & Imperial Stamp */}
          <div className="flex items-center justify-between pt-1 px-1">
            {/* Binary Barcode */}
            <div className="flex flex-col items-start">
              <div className="flex items-end gap-[2px] h-6 sm:h-7 bg-stone-900/90 px-1.5 py-1 rounded border border-stone-800">
                {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((h, i) => (
                  <div
                    key={i}
                    className="bg-amber-100 w-[1.5px] sm:w-[2px]"
                    style={{ height: `${(h / 9) * 100}%` }}
                  />
                ))}
              </div>
              <span className="text-[7px] font-mono text-stone-400 tracking-wider mt-0.5">
                40000 001993 01
              </span>
            </div>

            {/* Label stamp */}
            <div className="text-right">
              <p className="text-[9px] font-black text-amber-400 font-gothic tracking-widest">
                АВЕ ИМПЕРАТОР!
              </p>
              <p className="text-[7px] text-stone-400 font-mono mt-0.5">
                © {ALBUM_DATA.releaseYear} УЛЬТРА-ШАНСОН RECORDS
              </p>
              <p className="text-[6.5px] text-stone-500">
                Копирование карается расстрелом комиссара
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CD Jewel Case Specific Spine */}
      {caseStyle === 'cd' && (
        <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-l from-stone-950/90 via-white/10 to-transparent border-l border-white/10 pointer-events-none" />
      )}

      {/* Glare effect */}
      {showGlare && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none z-30" />
      )}
    </div>
  );
};
