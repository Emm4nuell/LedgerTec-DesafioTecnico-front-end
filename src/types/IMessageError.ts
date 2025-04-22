export interface MessageError {
  message: string;
  status: boolean;
}

export const defaultMessageError: MessageError = {
  message: "",
  status: false,
};
