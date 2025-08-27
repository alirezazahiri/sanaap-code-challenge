"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useCallbackRef } from "./use-callback-ref";
import type { ServerActionState, Action } from "@/types/action";

export type UseActionMutationProps<T> = {
  initialState?: ServerActionState<T> | null;
  onSuccess?: (state: ServerActionState<T>) => void;
  onError?: (state: ServerActionState<T>, error: string) => void;
};

export type UseActionMutationReturn<T, D = FormData> = {
  mutate: (payload: D) => void;
  isPending: boolean;
  data: ServerActionState<T> | null;
};

export const useActionMutation = <T, D = FormData>(
  action: Action<T, D>,
  { initialState, onSuccess, onError }: UseActionMutationProps<T> = {}
): UseActionMutationReturn<T, D> => {
  const onSuccessRef = useCallbackRef(onSuccess);
  const onErrorRef = useCallbackRef(onError);

  const [formState, formAction] = useActionState(action, initialState ?? null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log({formState, isPending});
    if (isPending) return;

    console.log("formState", formState);
    if (formState && !formState.success && formState.error) {
      onErrorRef?.(formState, formState.error);
    } else if (formState && formState.success && formState.response) {
      onSuccessRef?.(formState);
    }
  }, [isPending, formState, onErrorRef, onSuccessRef]);

  const mutate = useCallbackRef((payload: D) => {
    console.log("mutate", payload);
    startTransition(async () => {
      console.log("startTransition", payload);
      formAction(payload);
    });
  });

  return { mutate, isPending, data: formState };
};
