import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from "react";

type FieldWrapperProps = {
  children: ReactNode;
  error?: string | undefined;
  hint?: string | undefined;
  id: string;
  label: string;
  required?: boolean;
};

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> &
  Omit<FieldWrapperProps, "children">;

type TextAreaFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id"
> &
  Omit<FieldWrapperProps, "children">;

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> &
  Omit<FieldWrapperProps, "children"> & {
    options: { label: string; value: string }[];
  };

const controlClassName =
  "w-full rounded-xl border border-movenet-border bg-white px-4 py-3 text-sm text-movenet-text shadow-sm transition placeholder:text-movenet-muted/70 focus:border-movenet-emerald focus:outline-none disabled:cursor-not-allowed disabled:bg-movenet-cloud disabled:text-movenet-muted";

const FieldWrapper = ({
  children,
  error,
  hint,
  id,
  label,
  required = false
}: FieldWrapperProps) => {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-movenet-text" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-movenet-emerald">*</span> : null}
      </label>

      {children}

      {hint ? (
        <p className="mt-2 text-xs leading-5 text-movenet-muted" id={hintId}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p className="mt-2 text-xs font-medium leading-5 text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
};

export const InputField = ({
  error,
  hint,
  id,
  label,
  required = false,
  ...inputProps
}: InputFieldProps) => {
  const describedBy = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldWrapper
      error={error}
      hint={hint}
      id={id}
      label={label}
      required={required}
    >
      <input
        {...inputProps}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={controlClassName}
        id={id}
        required={required}
      />
    </FieldWrapper>
  );
};

export const TextAreaField = ({
  error,
  hint,
  id,
  label,
  required = false,
  ...textAreaProps
}: TextAreaFieldProps) => {
  const describedBy = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldWrapper
      error={error}
      hint={hint}
      id={id}
      label={label}
      required={required}
    >
      <textarea
        {...textAreaProps}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={`${controlClassName} min-h-30 resize-y`}
        id={id}
        required={required}
      />
    </FieldWrapper>
  );
};

export const SelectField = ({
  error,
  hint,
  id,
  label,
  options,
  required = false,
  ...selectProps
}: SelectFieldProps) => {
  const describedBy = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FieldWrapper
      error={error}
      hint={hint}
      id={id}
      label={label}
      required={required}
    >
      <select
        {...selectProps}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        className={controlClassName}
        id={id}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
