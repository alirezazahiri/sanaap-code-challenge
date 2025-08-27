import { BaseColorVariant } from "@/types/components";

export type PinInputProps = {
  autoFocus?: boolean;
  length?: number;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  color: BaseColorVariant;
  className?: string;
  placeholder?: string;
  error?: boolean;
};



export type PinInputRef = {
  focus: () => void;
  clear: () => void;
};
