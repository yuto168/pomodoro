import { useState, useEffect, useRef, useMemo } from "react";
import { Card } from "src/typings/taskItem";

export const useTimer = (
  selectedTask: Card | null,
  updateTaskTimer: (targetID: string, focusTime: number) => void
) => {
  // タイマーの基本設定
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

  // 表示用の時間を計算する
  const minutes = Math.floor(secoundLeft / 60);
  const seconds = secoundLeft % 60;
  const formattedSeconds = useMemo(
    () => (seconds < 10 ? `0${seconds}` : seconds),
    [seconds]
  );

  // 一時停止状態を更新する
  const changePause = (isPaused: boolean) => {
    setIsPaused(isPaused);
    pauseRef.current = isPaused;
  };

  // modeを更新する
  const changeMode = (mode: string) => {
    setMode(mode);
    modeRef.current = mode;
  };

  // 残り時間を更新する
  const changeSecondLeft = (secondLeft: number) => {
    setSecondLeft(secondLeft);
    secoundLeftRef.current = secondLeft;
  };

  // タイトルを更新する
  useEffect(() => {
    document.title = `${minutes}:${formattedSeconds} - Pomodoro Timer`;
  }, [minutes, formattedSeconds]);

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
    changeMode(nextMode);
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // タイマーをリセットする
  const resetTimer = () => {
    handlePause();
    focusedTime.current = 0;

    // モードをFocusにする
    changeMode("Focus");

    // 残り時間をリセットする
    const newTime = focusInterval;
    changeSecondLeft(newTime);
  };

  // モードが変更されたら残り時間を更新する
  useEffect(() => {
    const newTime = mode === "Focus" ? focusInterval : breakInterval;
    // 残り時間を更新する
    changeSecondLeft(newTime);
    focusedTime.current = 0;
  }, [mode, selectedTask, updateTaskTimer, breakInterval, focusInterval]);

  // タイマーを一時停止する
  const handlePause = () => {
    // 一時停止状態を更新する
    changePause(true);

    // 集中した時間でタスクの時間を更新
    if (selectedTask) updateTaskTimer(selectedTask.id, focusedTime.current);

    // 一時停止した時点でfocusTimeを初期化する
    focusedTime.current = 0;
  };

  // タイマーを開始する
  const handleStart = () => {
    // 一時停止状態であれば、タイマーを再開する
    if (isPaused) changePause(false);
  };

  return {
    mode,
    breakInterval,
    focusInterval,
    secoundLeft,
    focusTime: focusedTime.current,
    changeMode,
    minutes,
    formattedSeconds,
    isPaused,
    handlePause,
    handleStart,
    resetTimer,
  };
};
