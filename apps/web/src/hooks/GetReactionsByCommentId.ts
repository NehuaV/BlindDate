import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { env } from "@/env.mjs";

export function GetReactionsByCommentId(commentID: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `${env.NEXT_PUBLIC_GATEWAY}/comment/reactions/${commentID}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
