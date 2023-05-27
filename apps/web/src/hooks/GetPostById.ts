import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { env } from "@/env.mjs";

export function GetPostById(postID: string) {
  const { data, error, isLoading } = useSWR(
    `${env.NEXT_PUBLIC_GATEWAY}/post/${postID}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}
