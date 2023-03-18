import { useCallback } from "react";
import axios from "axios";

// 汎用APIクライエント。APIの共通設定を管理
export const useApiClient = () => {
  const urlBase = "";

  const get = useCallback(async <T,>(path: string) => {
    const result = await axios.get(`${urlBase}${path}`);
    const data: T = result.data;
    return data;
  }, []);

  const put = useCallback(async <T,>(path: string, data: T) => {
    const result = await axios.put(`${urlBase}${path}`, data);
    return result;
  }, []);

  const post = useCallback(async <T,>(path: string, body: T) => {
    const result = await axios.post(`${urlBase}${path}`, body);
    const data = result.data;
    return data;
  }, []);

  const deleteItem = useCallback(
    async (path: string, params: Record<string, string>) => {
      const result = await axios.delete(`${urlBase}${path}`, {
        params: params,
      });
      return result;
    },
    []
  );

  return {
    put,
    get,
    post,
    deleteItem,
  };
};
