import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { env } from "@/env.mjs";

export function GetPosts() {
  const { data, error, isLoading } = useSWR(
    `${env.NEXT_PUBLIC_GATEWAY}/post`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
}
