import { QueryFunction, useQuery } from "@tanstack/react-query";

export default function useGet({
  queryKey,
  queryFn,
}: {
  queryKey: string[];
  queryFn: QueryFunction;
}) {
  const {
    isLoading,
    error,
    data,
  }: {
    isLoading: boolean;
    error: any;
    data: { data: any[] };
  } = useQuery(queryKey, queryFn, {
    suspense: true,
    staleTime: 60 * 1000,
  });

  return {
    isLoading,
    error,
    data,
  };
}
