import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(
    initialData: T,
    validationRules?: Record<keyof T, (value: any) => string | undefined>
) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const validateField = (field: keyof T, value: any): string | undefined => {
        if (!validationRules || !validationRules[field]) return undefined;
        return validationRules[field](value);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};

        if (validationRules) {
            Object.keys(validationRules).forEach((key) => {
                const field = key as keyof T;
                const error = validateField(field, formData[field]);
                if (error) {
                    newErrors[field] = error;
                }
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof T) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSelectChange = (field: keyof T) => (
        e: any
    ) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSliderChange = (field: keyof T) => (
        _: Event,
        value: number | number[]
    ) => {
        const numValue = Array.isArray(value) ? value[0] : value;
        setFormData(prev => ({ ...prev, [field]: numValue }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const resetForm = (newData?: T) => {
        setFormData(newData || initialData);
        setErrors({});
        setSubmitError('');
    };

    const setFieldError = (field: keyof T, error: string) => {
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const clearFieldError = (field: keyof T) => {
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return {
        formData,
        errors,
        submitError,
        loading,
        setFormData,
        setErrors,
        setSubmitError,
        setLoading,
        validateForm,
        handleInputChange,
        handleSelectChange,
        handleSliderChange,
        resetForm,
        setFieldError,
        clearFieldError,
    };
}; 