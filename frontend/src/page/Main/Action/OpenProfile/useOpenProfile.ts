import {useEffect, useState} from "react";

export const useOpenProfile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            const user = localStorage.getItem('user_name');
            setValue(user ?? '');
        }
    }, [isOpen]);

    function saveName() {
        if (!value.trim()) return;
        localStorage.setItem('user_name', value.trim());
        setIsOpen(false);
    }

    return {
        modal: {isOpen, setIsOpen},
        value: {value, setValue},
        saveName: saveName,
    };
}