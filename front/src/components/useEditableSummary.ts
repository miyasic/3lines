import { useCallback, useState } from 'react';

const MAX_CHARS = 30;

const useEditableSummary = () => {
    const [isOverLimit, setIsOverLimit] = useState({
        title: false,
        summary1: false,
        summary2: false,
        summary3: false
    });

    const handleInput = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.FormEvent<HTMLDivElement>) => {
        const newText = event.currentTarget.textContent || "";
        if (newText.length <= MAX_CHARS) {
            setter(newText);
            setIsOverLimit(prev => ({ ...prev, [field]: false }));
        } else {
            event.currentTarget.textContent = newText.slice(0, MAX_CHARS);
            setter(newText.slice(0, MAX_CHARS));
            setIsOverLimit(prev => ({ ...prev, [field]: true }));
        }
    }, []);

    const handlePaste = useCallback((setter: (value: string) => void, field: keyof typeof isOverLimit) => (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('text');
        const currentText = event.currentTarget.textContent || "";
        const newText = (currentText + pastedText).slice(0, MAX_CHARS);
        event.currentTarget.textContent = newText;
        setter(newText);
        setIsOverLimit(prev => ({ ...prev, [field]: newText.length > MAX_CHARS }));
    }, []);

    return { isOverLimit, handleInput, handlePaste };
};

export default useEditableSummary;
