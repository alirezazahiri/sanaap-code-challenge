"use client";

import { SessionData } from "@/lib/set-session";
import { useQuery } from "@tanstack/react-query";

const getSession = async () => {
  const response = await fetch("/api/auth/session");
  return response.json() as Promise<SessionData>;
};

export const useSession = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
