import { FormEvent } from "react";

export type CustomFormEvent<T> = FormEvent<HTMLFormElement> & {
  target: FormEvent<HTMLFormElement>["target"] & T;
};
