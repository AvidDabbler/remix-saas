import { type HTMLInputTypeAttribute } from "react";
import { type FieldError, type FieldErrorsImpl, type Merge, useForm } from "react-hook-form";

export const ValidatedInput = ({
  name,
  placeholder,
  type,
  label,
  error
}: {
  name: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined // eslint-disable-line
}) => {
  const { register } = useForm();


  return (
    <div className="text-gray-900 w-full grid">
      <label className="mx-2 pb-2" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ?? ""}
        className="h-6 p-6 w-full border rounded-md"
      />
      {error && typeof error === "string" ? <p className="text-red-500 px-3">{error}</p> : null}
    </div>
  );
};
