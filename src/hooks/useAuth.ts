import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "src/constants/supabase";
import { AuthError } from "@supabase/supabase-js";

export const useAuth = () => {
  // ログイン状態を管理
  const [session, setSession] = useState<Session | null>(null);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [userID, setUserID] = useState<string>("");

  // GitHubでサインイン
  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.REACT_APP_URL,
      },
    });
    if (error) {
      // ログイン失敗時はerrorに設定
      setAuthError(error);
    }
  };
  // GitHubでサインアウト
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // セッション情報とユーザー情報を設定
        setSession(session);
        setUserID(session?.user?.id ?? "");
      }
    );
    // リスナーの解除
    return () => authData.subscription.unsubscribe();
  }, []);

  return {
    signInWithGithub,
    signOut,
    session,
    authError,
    userID,
  };
};
