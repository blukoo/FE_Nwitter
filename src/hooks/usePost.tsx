import { UseMutateContext } from "@/contexts/MutateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
export default function usePost({
  queryKey,
  queryFn
}: {
  queryKey: string[];
  queryFn: Function;
}) {
  const queryClient = useQueryClient();
  const { action } = UseMutateContext();

  return useMutation(
    async (query: any) => {
      console.log(query, "@@@");
      action.action(e => {
        e.isLoading = true;
        return { ...e };
      });
      let res = await queryFn(query);
      return res;
    },
    {
      onSuccess: async (res, a, d) => {
        action.action(e => {
          e.isLoading = false;
          e.data = res;
          return { ...e };
        });
        console.log(res, a, d, "데잍터");
        await queryClient.invalidateQueries(queryKey);
        return res;
      }
      // ,
      // onError: async (res, a, d) => {
      //   action.action(e => {
      //     e.isLoading = false;
      //     e.data = res;
      //     return { ...e };
      //   });
      //   console.log(res, a, d, "데잍터");
      //   await queryClient.invalidateQueries(queryKey);
      //   return res;
      // }
    }
  );
  // return { mutate, data };
}
