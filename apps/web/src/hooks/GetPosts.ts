import { fetcher } from "../utils/fetcher";
import { Post } from "../types/post";
import useSWR from "swr";

export function GetPosts() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_POST_SERVICE_URL}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
}
