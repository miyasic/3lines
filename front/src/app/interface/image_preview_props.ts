interface ImagePreviewProps {
    title: string;
    summary1: string;
    summary2: string;
    summary3: string;
    backgroundImage: string;
    setTitle: (title: string) => void;
    setSummary1: (summary1: string) => void;
    setSummary2: (summary2: string) => void;
    setSummary3: (summary3: string) => void;
}