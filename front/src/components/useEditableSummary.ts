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
    const [length, setLength] = useState({
        title: 0,
        summary1: 0,
        summary2: 0,
        summary3: 0
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

    return { isOverLimit,length, handleInput };
};

export default useEditableSummary;
