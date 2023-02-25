export type ValidationError = {
  [key: string]: string[];
};

type GetValidationError = <T extends ValidationError>(
  key: keyof T,
  erros?: T,
) =>
  | {
      message: string;
    }
  | undefined;

export const getValidationError: GetValidationError = (key, erros) => {
  if (!erros) {
    return undefined;
  }

  const messages = erros[key];

  if (!messages) {
    return undefined;
  }

  return { message: messages[0] };
};
