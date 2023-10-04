import { useState, useEffect, useRef, useMemo } from "react";
import { TaskItem } from "src/typings/taskItem";

export const useTimer = (
  selectedTask: TaskItem | null,
  updateTaskTimer: (targetID: string, focusTime: number) => void
) => {
  const focusInterval = 25 * 60;
  const breakInterval = 5 * 60;

  // 一時停止した時点での残り時間
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("Focus");
  const [secoundLeft, setSecondLeft] = useState(focusInterval);

  // useRefを使うことで、再レンダリングしても値が変わらないようにする
  const pauseRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const secoundLeftRef = useRef(secoundLeft);
  const focusedTime = useRef(0);

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

    // focus状態の時に、集中時間を更新する
    if (modeRef.current === "Focus") {
      focusedTime.current = focusedTime.current + 1;
    }
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
    focusedTime.current = 0;

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
        if (
          modeRef.current === "Focus" &&
          selectedTask &&
          focusedTime.current > 0
        ) {
          updateTaskTimer(selectedTask.id, focusedTime.current);
        }
        return switchMode();
      }
      tick();
      // TODO: 一時的にタイマーの速度を早くしている
    }, 1);

    return () => {
      clearInterval(interval);
    };
  });

  // モードが変更されたら残り時間を更新する
  useEffect(() => {
    const newTime = mode === "Focus" ? focusInterval : breakInterval;
    focusedTime.current = 0;
    setSecondLeft(newTime);
    secoundLeftRef.current = newTime;
  }, [mode]);

  // タイマーを一時停止する
  const handlePause = () => {
    setIsPaused(true);
    pauseRef.current = true;

    // 集中した時間でタスクの時間を更新
    if (selectedTask) updateTaskTimer(selectedTask.id, focusedTime.current);

    // 一時停止した時点でfocusTimeを初期化する
    focusedTime.current = 0;
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
    focusTime: focusedTime.current,
    setMode,
    minutes,
    formattedSeconds,
    isPaused,
    handlePause,
    handleStart,
    resetTimer,
  };
};
