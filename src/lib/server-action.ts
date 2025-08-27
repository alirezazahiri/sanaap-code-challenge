"use server";

import { ServerActionState } from "@/types/action";

export const envelopeServerAction = async <T>(
  action: () => Promise<T>
): Promise<ServerActionState<T>> => {
  try {
    const response = await action();
    return { success: true, response };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
