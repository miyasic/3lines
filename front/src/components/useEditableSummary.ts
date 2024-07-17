import { useCallback, useState } from 'react';

const MAX_CHARS_TITLE = 25;
const MAX_CHARS_SUMMARY = 30;

const useEditableSummary = (setIsAllUnderLimit: (value: boolean) => void) => {
    const [isOverLimit, setIsOverLimit] = useState({
        title: false,
        summary1: false,
        summary2: false,
        summary3: false
    });

    const checkAllUnderLimit = (updatedIsOverLimit: typeof isOverLimit) => {
        setIsAllUnderLimit(Object.values(updatedIsOverLimit).every(value => !value));
    };

    const handleInput = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.FormEvent<HTMLDivElement>) => {
        const newText = event.currentTarget.textContent || "";
        const maxChars = field === 'title' ? MAX_CHARS_TITLE : MAX_CHARS_SUMMARY;

        setter(newText);
        setIsOverLimit(prev => {
            const updatedIsOverLimit = { ...prev, [field]: newText.length > maxChars };
            checkAllUnderLimit(updatedIsOverLimit);
            return updatedIsOverLimit;
        });
    }, []);

    return { isOverLimit, handleInput };
};

export default useEditableSummary;
