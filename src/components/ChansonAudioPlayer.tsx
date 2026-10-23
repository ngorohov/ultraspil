import React, { useState, useEffect } from 'react';
import { TRACKS } from '../data/albumData';
import { audioEngine } from '../utils/audioEngine';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  FileText,
  Radio,
  Disc,
  Zap
} from 'lucide-react';

interface Props {
  currentTrackId: number;
  onTrackChange: (id: number) => void;
  onOpenLyrics: () => void;
}

export const ChansonAudioPlayer: React.FC<Props> = ({
  currentTrackId,
  onTrackChange,
  onOpenLyrics,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentChord, setCurrentChord] = useState("Am");
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [vinylEnabled, setVinylEnabled] = useState(true);
  const [chainswordEnabled, setChainswordEnabled] = useState(false);
  const [isRevving, setIsRevving] = useState(false);

  const currentTrack = TRACKS.find((t) => t.id === currentTrackId) || TRACKS[0];

  useEffect(() => {
    // Setup audio engine callbacks
    audioEngine.onStateChange = (playing) => setIsPlaying(playing);
    audioEngine.onTimeUpdate = (time) => {
      setCurrentTime(time);
      if (time >= currentTrack.durationSec) {
        handleNext();
      }
    };
    audioEngine.onChordUpdate = (chord) => setCurrentChord(chord);

    // Load track into engine
    audioEngine.setTrack(currentTrack.progression, currentTrack.tempo, currentTrack.meter);

    return () => {
      audioEngine.pause();
    };
  }, [currentTrackId]);

  const handleTogglePlay = () => {
    audioEngine.togglePlay();
  };

  const handleNext = () => {
    const nextId = currentTrackId >= TRACKS.length ? 1 : currentTrackId + 1;
    onTrackChange(nextId);
  };

  const handlePrev = () => {
    const prevId = currentTrackId <= 1 ? TRACKS.length : currentTrackId - 1;
    onTrackChange(prevId);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioEngine.seek(val);
    setCurrentTime(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    audioEngine.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume || 0.8);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const toggleVinyl = () => {
    const next = !vinylEnabled;
    setVinylEnabled(next);
    audioEngine.toggleVinyl(next);
  };

  const toggleChainsword = () => {
    const next = !chainswordEnabled;
    setChainswordEnabled(next);
    audioEngine.toggleChainswordEngine(next);
  };

  const handleRevChainsword = () => {
    setIsRevving(true);
    audioEngine.triggerChainswordRev();
    setTimeout(() => setIsRevving(false), 900);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-stone-900/95 border border-amber-600/40 rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Top Bar: Now Playing + Live Chord + FX badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 font-poster text-lg shadow-inner">
            {currentTrack.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                {currentTrack.meter} • {currentTrack.tempo} BPM
              </span>
              <span className="text-[10px] font-chanson italic text-stone-400">
                Тональность: {currentTrack.key}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-chanson font-bold text-amber-100 flex items-center gap-2">
              {currentTrack.title}
            </h3>
          </div>
        </div>

        {/* Live Chanson Chord Indicator */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-950/80 border border-amber-500/50 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-inner">
            <span className="text-[10px] text-stone-400 uppercase font-mono">Аккорд:</span>
            <span className="font-mono text-base font-black text-amber-400 animate-pulse">
              {isPlaying ? currentChord : currentTrack.key}
            </span>
          </div>

          <button
            onClick={onOpenLyrics}
            className="flex items-center gap-1.5 text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-amber-500/50 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            title="Открыть текст и аккорды"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Слова и аккорды</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[11px] font-mono text-stone-400 mb-1">
          <span>{formatTime(currentTime)}</span>
          <span className="text-stone-500">
            {isPlaying ? 'Играет гитара Ультрамара' : 'Пауза'}
          </span>
          <span>{currentTrack.duration}</span>
        </div>
        <input
          type="range"
          min="0"
          max={currentTrack.durationSec}
          step="0.5"
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>

      {/* Transport Controls & FX Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Chainsword & Vinyl FX switches */}
        <div className="flex items-center gap-2">
          {/* Vinyl crackle toggle */}
          <button
            onClick={toggleVinyl}
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${
              vinylEnabled
                ? 'bg-amber-950/50 border-amber-500 text-amber-300'
                : 'bg-stone-950 border-stone-800 text-stone-500'
            }`}
            title="Треск старой пластинки"
          >
            <Disc className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Треск винила</span>
          </button>

          {/* Chainsword idle toggle */}
          <button
            onClick={toggleChainsword}
            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border transition-all cursor-pointer ${
              chainswordEnabled
                ? 'bg-red-950/70 border-red-500 text-red-300'
                : 'bg-stone-950 border-stone-800 text-stone-500'
            }`}
            title="Фоновый рокот мотора цепного меча"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Холостой ход меча</span>
          </button>

          {/* Rev Chainsword Trigger */}
          <button
            onClick={handleRevChainsword}
            disabled={isRevving}
            className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-md bg-gradient-to-r from-red-900 to-amber-800 hover:from-red-800 hover:to-amber-700 text-amber-100 border border-red-500/60 shadow-md cursor-pointer active:scale-95 transition-all"
            title="Газануть цепным мечом!"
          >
            <Zap className={`w-3.5 h-3.5 text-amber-300 ${isRevving ? 'animate-bounce' : ''}`} />
            <span>Взреветь мечом!</span>
          </button>
        </div>

        {/* Center: Playback buttons */}
        <div className="flex items-center gap-3 mx-auto">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
            title="Предыдущий трек"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? "Пауза" : "Слушать шансон"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-stone-950" />
            ) : (
              <Play className="w-6 h-6 fill-stone-950 translate-x-0.5" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
            title="Следующий трек"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Volume slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
            title="Громкость"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
};
