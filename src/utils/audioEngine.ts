// Web Audio API Acoustic Chanson Synthesizer with Russian Chanson strum rhythms and chainsword FX

const NOTE_FREQS: Record<string, number> = {
  "E2": 82.41, "F2": 87.31, "F#2": 92.50, "G2": 98.00, "G#2": 103.83, "A2": 110.00, "Bb2": 116.54, "B2": 123.47,
  "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81, "F3": 174.61, "F#3": 185.00, "G3": 196.00, "G#3": 207.65, "A3": 220.00, "Bb3": 233.08, "B3": 246.94,
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00, "Bb4": 466.16, "B4": 493.88,
  "C5": 523.25, "D5": 587.33, "E5": 659.25
};

const CHORD_VOICINGS: Record<string, { bass: string; altBass: string; treble: string[] }> = {
  Am: { bass: "A2", altBass: "E2", treble: ["E3", "A3", "C4", "E4"] },
  Dm: { bass: "D3", altBass: "A2", treble: ["A3", "D4", "F4", "A4"] },
  E7: { bass: "E2", altBass: "B2", treble: ["G#3", "D4", "E4"] },
  C: { bass: "C3", altBass: "G2", treble: ["E3", "G3", "C4", "E4"] },
  G: { bass: "G2", altBass: "D3", treble: ["B2", "D3", "G3", "B3", "G4"] },
  Em: { bass: "E2", altBass: "B2", treble: ["B2", "E3", "G3", "B3", "E4"] },
  B7: { bass: "B2", altBass: "F#2", treble: ["D#3", "A3", "B3", "F#4"] },
  F: { bass: "F2", altBass: "C3", treble: ["A2", "C3", "F3", "A3", "C4"] },
  Gm: { bass: "G2", altBass: "D3", treble: ["Bb2", "D3", "G3", "Bb3"] },
  A7: { bass: "A2", altBass: "E2", treble: ["G3", "C#4", "E4", "A4"] },
  Hm: { bass: "B2", altBass: "F#2", treble: ["F#3", "B3", "D4", "F#4"] },
  "F#7": { bass: "F#2", altBass: "C#3", treble: ["E3", "A#3", "C#4", "F#4"] },
  D: { bass: "D3", altBass: "A2", treble: ["A3", "D4", "F#4"] },
  A: { bass: "A2", altBass: "E2", treble: ["E3", "A3", "C#4", "E4"] }
};

class ChansonAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
  private chainswordGain: GainNode | null = null;
  
  private isPlaying = false;
  private currentTime = 0;
  private timerId: number | null = null;
  private currentTrackProgression: Array<{ chord: string; beats: number }> = [];
  private currentTempo = 104;
  private currentMeter = "4/4";
  private currentBeat = 0;
  
  private volume = 0.8;
  private vinylCrackleEnabled = true;
  private chainswordIdleEnabled = false;

  public onTimeUpdate?: (time: number) => void;
  public onChordUpdate?: (chord: string) => void;
  public onStateChange?: (isPlaying: boolean) => void;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Setup vinyl crackle node
      this.initVinylCrackle();
      // Setup chainsword rev sound
      this.initChainswordSound();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private initVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;
    
    // Low constant vinyl hiss
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 1.2;

    this.vinylGain = this.ctx.createGain();
    this.vinylGain.gain.value = this.vinylCrackleEnabled ? 0.12 : 0;

    whiteNoise.connect(filter);
    filter.connect(this.vinylGain);
    this.vinylGain.connect(this.masterGain);

    whiteNoise.start(0);

    // Occasional needle pop / dust clicks
    setInterval(() => {
      if (this.vinylCrackleEnabled && this.isPlaying && this.ctx && this.vinylGain) {
        if (Math.random() < 0.3) {
          this.triggerVinylPop();
        }
      }
    }, 400);
  }

  private triggerVinylPop() {
    if (!this.ctx || !this.vinylGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(60 + Math.random() * 200, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(this.vinylGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  private initChainswordSound() {
    if (!this.ctx || !this.masterGain) return;
    this.chainswordGain = this.ctx.createGain();
    this.chainswordGain.gain.value = 0;
    this.chainswordGain.connect(this.masterGain);
  }

  public toggleChainswordEngine(enable?: boolean) {
    this.initContext();
    this.chainswordIdleEnabled = enable !== undefined ? enable : !this.chainswordIdleEnabled;
    if (!this.chainswordGain || !this.ctx) return this.chainswordIdleEnabled;

    if (this.chainswordIdleEnabled) {
      // Create rumbling 2-stroke chainsaw / chainsword motor idle
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const dist = this.ctx.createWaveShaper();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // Low idle rumble
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      // Distortion curve
      const n = 256;
      const curve = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = (i * 2) / n - 1;
        curve[i] = ((3 + 10) * x * 20 * (Math.PI / 180)) / (Math.PI + 10 * Math.abs(x));
      }
      dist.curve = curve;

      osc1.connect(dist);
      osc2.connect(dist);
      dist.connect(filter);
      filter.connect(this.chainswordGain);

      this.chainswordGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.chainswordGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.5);

      osc1.start();
      osc2.start();
    } else {
      if (this.chainswordGain && this.ctx) {
        this.chainswordGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      }
    }
    return this.chainswordIdleEnabled;
  }

  public triggerChainswordRev() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.35); // Rev up!
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.85); // Wind down

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, now);
    filter.Q.value = 2.5;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.95);
  }

  // Synthesize acoustic nylon/steel string pluck
  private pluckString(freq: number, duration: number, isBass = false, offset = 0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + offset;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isBass ? "triangle" : "sawtooth";
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    // Warm wooden guitar body filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(isBass ? 700 : 1800, now);
    filter.frequency.exponentialRampToValueAtTime(isBass ? 250 : 400, now + duration);

    // Pluck attack & decay envelope
    const peakGain = isBass ? 0.28 : 0.14;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peakGain, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    if (isBass) {
      const subGain = this.ctx.createGain();
      subGain.gain.value = 0.2;
      subOsc.connect(subGain);
      subGain.connect(filter);
    }
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration + 0.05);
    subOsc.stop(now + duration + 0.05);
  }

  // Play chanson rhythm beat
  private playChansonBeat(chordName: string, beatIndex: number) {
    const voicing = CHORD_VOICINGS[chordName] || CHORD_VOICINGS["Am"];
    const beatDuration = 60 / this.currentTempo;

    if (this.currentMeter === "3/4") {
      // Waltz style chanson (e.g. "Кубок Императора")
      if (beatIndex % 3 === 0) {
        // Heavy bass root on 1
        const bassFreq = NOTE_FREQS[voicing.bass] || 110;
        this.pluckString(bassFreq, beatDuration * 1.5, true);
      } else {
        // Light chord strum on 2 and 3
        voicing.treble.forEach((note, i) => {
          const freq = NOTE_FREQS[note] || 220;
          this.pluckString(freq, beatDuration * 0.7, false, i * 0.012);
        });
      }
    } else {
      // Classic 4/4 Russian chanson blatnoy strum:
      // Beat 0: Root Bass (БУМ)
      // Beat 1: Treble Strum (ЧАК)
      // Beat 2: Alternate Bass (БУМ)
      // Beat 3: Treble Strum with accent (ЧАК!)
      const step = beatIndex % 4;
      if (step === 0) {
        const bassFreq = NOTE_FREQS[voicing.bass] || 110;
        this.pluckString(bassFreq, beatDuration * 1.6, true);
      } else if (step === 1) {
        voicing.treble.forEach((note, i) => {
          const freq = NOTE_FREQS[note] || 220;
          this.pluckString(freq, beatDuration * 0.8, false, i * 0.009);
        });
      } else if (step === 2) {
        const altBassFreq = NOTE_FREQS[voicing.altBass] || NOTE_FREQS[voicing.bass] || 110;
        this.pluckString(altBassFreq, beatDuration * 1.6, true);
      } else if (step === 3) {
        voicing.treble.forEach((note, i) => {
          const freq = NOTE_FREQS[note] || 220;
          this.pluckString(freq, beatDuration * 0.9, false, i * 0.007);
        });
      }
    }
  }

  public setTrack(progression: Array<{ chord: string; beats: number }>, tempo = 104, meter = "4/4") {
    this.currentTrackProgression = progression;
    this.currentTempo = tempo;
    this.currentMeter = meter;
    this.currentBeat = 0;
    this.currentTime = 0;
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.onStateChange?.(true);

    const beatIntervalMs = (60 / this.currentTempo) * 1000;

    let totalBeatsInProg = 0;
    for (const item of this.currentTrackProgression) {
      totalBeatsInProg += item.beats;
    }
    if (totalBeatsInProg === 0) totalBeatsInProg = 16;

    this.timerId = window.setInterval(() => {
      // Find which chord belongs to current beat
      let accumulated = 0;
      let activeChord = "Am";
      const normalizedBeat = this.currentBeat % totalBeatsInProg;

      for (const item of this.currentTrackProgression) {
        accumulated += item.beats;
        if (normalizedBeat < accumulated) {
          activeChord = item.chord;
          break;
        }
      }

      this.onChordUpdate?.(activeChord);
      this.playChansonBeat(activeChord, this.currentBeat);

      this.currentBeat++;
      this.currentTime += 60 / this.currentTempo;
      this.onTimeUpdate?.(this.currentTime);
    }, beatIntervalMs);
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.onStateChange?.(false);
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(seconds: number) {
    this.currentTime = Math.max(0, seconds);
    const beatDuration = 60 / this.currentTempo;
    this.currentBeat = Math.floor(this.currentTime / beatDuration);
    this.onTimeUpdate?.(this.currentTime);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleVinyl(val?: boolean) {
    this.vinylCrackleEnabled = val !== undefined ? val : !this.vinylCrackleEnabled;
    if (this.vinylGain && this.ctx) {
      this.vinylGain.gain.setValueAtTime(this.vinylCrackleEnabled ? 0.12 : 0, this.ctx.currentTime);
    }
    return this.vinylCrackleEnabled;
  }
}

export const audioEngine = new ChansonAudioEngine();
