import { MAX_CHARS_SUMMARY, MAX_CHARS_TITLE } from '@/constants/constants';
import { useCallback, useState } from 'react';

interface EditableSummaryInitialValues {
    title: string;
    summary1: string;
    summary2: string;
    summary3: string;
    [key: string]: string;
}

const useEditableSummary = (setIsAllUnderLimit: (value: boolean) => void,
    initialValues: EditableSummaryInitialValues
) => {
    const [isOverLimit, setIsOverLimit] = useState({
        title: initialValues.title.length > MAX_CHARS_TITLE,
        summary1: initialValues.summary1.length > MAX_CHARS_SUMMARY,
        summary2: initialValues.summary2.length > MAX_CHARS_SUMMARY,
        summary3: initialValues.summary3.length > MAX_CHARS_SUMMARY,
    });
    const [length, setLength] = useState({
        title: initialValues.title.length,
        summary1: initialValues.summary1.length,
        summary2: initialValues.summary2.length,
        summary3: initialValues.summary3.length,
    });

    const handleInput = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.FormEvent<HTMLDivElement>) => {
        const newText = event.currentTarget.textContent || "";
        const maxChars = field === 'title' ? MAX_CHARS_TITLE : MAX_CHARS_SUMMARY;

        const checkAllUnderLimit = (updatedIsOverLimit: typeof isOverLimit) => {
            setIsAllUnderLimit(Object.values(updatedIsOverLimit).every(value => !value));
        };

        setter(newText);
        setLength(prev => {
            const updatedLength = { ...prev, [field]: newText.length };
            return updatedLength;
        });
        setIsOverLimit(prev => {
            const updatedIsOverLimit = { ...prev, [field]: newText.length > maxChars };
            checkAllUnderLimit(updatedIsOverLimit);
            return updatedIsOverLimit;
        });
    }, [setIsAllUnderLimit]);

    return { isOverLimit, length, handleInput };
};

export default useEditableSummary;
