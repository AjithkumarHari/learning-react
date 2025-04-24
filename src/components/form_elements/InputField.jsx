import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const InputField = ({
    name,
    label,
    type = "text",
    rules = {},
    placeholder = " ",
    maxLength,
    disabled = false,
    useController = false,
    onChange,
    customError = "",
}) => {
    
    const { register, control, formState: { errors } } = useFormContext();

    const fieldError = errors[name]?.message;

    return (
        <div className="relative mt-2 w-full pb-5">
            {useController ? (
                <Controller name={name} control={control} rules={rules} render={({ field }) => (
                    <input {...field} id={name} type={type} placeholder={placeholder} className='input-normal' maxLength={maxLength} disabled={disabled}
                        onChange={(e) => {
                            field.onChange(e);
                            onChange?.(e);
                        }}
                    />
                )}
                />
            ) : (
                <input id={name} type={type} placeholder={placeholder} className={fieldError ? 'input-error' : 'input-normal'} maxLength={maxLength} disabled={disabled}
                    {...register(name, {
                        ...rules,
                        onChange: (e) => {
                            rules?.onChange?.(e);
                            onChange?.(e);
                        },
                    })}
                />
            )}
            <label htmlFor={name} className="floating-label">
                {label}
            </label>
            {fieldError && (
                <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">
                    {fieldError}
                </span>
            )}
            {!fieldError && customError && (
                <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3 mt-5">
                    {customError}
                </span>
            )}
        </div>
    );
};

export default InputField;