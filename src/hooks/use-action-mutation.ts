"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useCallbackRef } from "./use-callback-ref";
import type { ServerActionState, Action } from "@/types/action";

export type UseActionMutationProps<T> = {
  initialState?: ServerActionState<T> | null;
  onSuccess?: (state: ServerActionState<T>) => void;
  onError?: (state: ServerActionState<T>, error: string) => void;
};

export type UseActionMutationReturn<T> = {
  mutate: (payload: FormData) => void;
  isPending: boolean;
  data: ServerActionState<T> | null;
};

export const useActionMutation = <T>(
  action: Action<T>,
  { initialState, onSuccess, onError }: UseActionMutationProps<T> = {}
): UseActionMutationReturn<T> => {
  const onSuccessRef = useCallbackRef(onSuccess);
  const onErrorRef = useCallbackRef(onError);

  const [formState, formAction] = useActionState(action, initialState ?? null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) return;

    if (formState && !formState.success && formState.error) {
      onErrorRef?.(formState, formState.error);
    } else if (formState && formState.success && formState.response) {
      onSuccessRef?.(formState);
    }
  }, [isPending, formState, onErrorRef, onSuccessRef]);

  const mutate = useCallbackRef((payload: FormData) => {
    startTransition(async () => {
      formAction(payload);
    });
  });

  return { mutate, isPending, data: formState };
};
