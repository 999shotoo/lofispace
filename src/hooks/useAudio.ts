import { useState, useRef, useCallback, useEffect } from "react";

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  error: string | null;
  analyserNode: AnalyserNode | null;
}

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.7,
    error: null,
    analyserNode: null,
  });

  const initAudioContext = useCallback(() => {
    if (audioContextRef.current) return;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    audioContextRef.current = ctx;
    analyserRef.current = analyser;
    setState((s) => ({ ...s, analyserNode: analyser }));
  }, []);

  const connectSource = useCallback(() => {
    if (!audioRef.current || !audioContextRef.current || !analyserRef.current || sourceRef.current) return;
    const source = audioContextRef.current.createMediaElementSource(audioRef.current);
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);
    sourceRef.current = source;
  }, []);

  const play = useCallback(async (url: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    initAudioContext();

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.volume = state.volume;
    }

    // If same URL and just paused, resume
    if (audioRef.current.src === url && audioRef.current.paused) {
      try {
        await audioContextRef.current?.resume();
        connectSource();
        await audioRef.current.play();
        setState((s) => ({ ...s, isPlaying: true, isLoading: false }));
        return;
      } catch {
        // fall through to reload
      }
    }

    audioRef.current.src = url;
    connectSource();

    try {
      await audioContextRef.current?.resume();
      await audioRef.current.play();
      setState((s) => ({ ...s, isPlaying: true, isLoading: false }));
    } catch (e: any) {
      setState((s) => ({
        ...s,
        isPlaying: false,
        isLoading: false,
        error: e.message || "Playback failed",
      }));
    }
  }, [state.volume, initAudioContext, connectSource]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
    setState((s) => ({ ...s, volume: v }));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => {
      setState((s) => ({
        ...s,
        isPlaying: false,
        isLoading: false,
        error: "Stream unavailable. Try another station.",
      }));
    };
    const onWaiting = () => setState((s) => ({ ...s, isLoading: true }));
    const onPlaying = () => setState((s) => ({ ...s, isLoading: false, isPlaying: true }));

    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
    };
  });

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      audioContextRef.current?.close();
      audioContextRef.current = null;
      sourceRef.current = null;
    };
  }, []);

  return { ...state, play, pause, setVolume };
};
