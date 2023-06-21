import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { env } from "@/env.mjs";

export function GetReactionsByPostId(postID: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.NEXT_PUBLIC_GATEWAY}/post/reactions/${postID}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
