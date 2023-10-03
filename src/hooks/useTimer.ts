import { useState, useEffect, useRef, useMemo } from "react";
import { useTasks } from "./useTasks";

export const useTimer = () => {
  const focusInterval = 25 * 60;
  const breakInterval = 5 * 60;
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("Focus");
  const [secoundLeft, setSecondLeft] = useState(focusInterval);

  const { updateTaskTimer, selectedTask } = useTasks();

  // useRefを使うことで、再レンダリングしても値が変わらないようにする
  const pauseRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const secoundLeftRef = useRef(secoundLeft);
  // インターバルのうち、集中した時間
  const focusTime = focusInterval - secoundLeftRef.current;

  const minutes = Math.floor(secoundLeft / 60);
  const seconds = secoundLeft % 60;
  const formattedSeconds = useMemo(
    () => (seconds < 10 ? `0${seconds}` : seconds),
    [seconds]
  );

  // 残り時間を１減らす
  const tick = () => {
    setSecondLeft((prev) => prev - 1);
    secoundLeftRef.current = secoundLeftRef.current - 1;
  };

  // モードを切り替える
  const switchMode = () => {
    const nextMode = modeRef.current === "Focus" ? "Break" : "Focus";
    modeRef.current = nextMode;
    setMode(nextMode);
  };

  // タイマーをリセットする
  const resetTimer = () => {
    handlePause();
    setMode("Focus");
    modeRef.current = "Focus";

    // 残り時間をリセットする
    const newTime = focusInterval;
    setSecondLeft(newTime);
    secoundLeftRef.current = newTime;
  };

  // アンマウント時にタイマーをクリアする
  useEffect(() => {
    // 休憩状態であれば何もしない
    if (pauseRef.current) {
      return;
    }
    const interval = setInterval(() => {
      if (pauseRef.current) return;
      if (secoundLeftRef.current === 0) {
        // focusからbreakに切り替わったら、集中時間を更新する。
        if (modeRef.current === "Focus" && selectedTask && focusTime > 0)
          updateTaskTimer(selectedTask.id, focusInterval);
        return switchMode();
      }
      tick();
      // TODO: 一時的にタイマーの速度を早くしている
    }, 5);

    return () => {
      clearInterval(interval);
    };
  });

  // モードが変更されたら残り時間を更新する
  useEffect(() => {
    const newTime = mode === "Focus" ? focusInterval : breakInterval;
    setSecondLeft(newTime);
    secoundLeftRef.current = newTime;
  }, [mode]);

  // タイマーを一時停止する
  const handlePause = () => {
    setIsPaused(true);
    pauseRef.current = true;
  };

  // タイマーを開始する
  const handleStart = () => {
    if (pauseRef.current) {
      setIsPaused(false);
      pauseRef.current = false;
    }
  };

  return {
    mode,
    switchMode,
    breakInterval,
    focusInterval,
    secoundLeft,
    focusTime,
    setMode,
    minutes,
    formattedSeconds,
    isPaused,
    handlePause,
    handleStart,
    resetTimer,
  };
};
