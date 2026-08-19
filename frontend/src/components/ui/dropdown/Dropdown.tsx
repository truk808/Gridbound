import { useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownItem {
    id: number;
    label: string;
}

interface DropdownProps<T extends DropdownItem> {
    items: T[];
    selectedId: number | null;
    onChange: (ids: number | null) => void;
    placeholder?: string;
}

export const Dropdown = <T extends DropdownItem>({
                                                                items,
                                                                selectedId,
                                                                onChange,
                                                                placeholder = "Выберите Персонажа",
                                                            }: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);

    const toggle = (id: number | null) => {
        onChange(
           id
        );
    };

    const selectedLabels = items
        .filter(item => selectedId === item.id)
        .map(item => item.label);

    return (
        <div className={styles.root}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(prev => !prev)}
            >
                <span className={styles.value}>
                    {selectedLabels.length > 0
                        ? selectedLabels.join(", ")
                        : placeholder}
                </span>
                <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className={styles.menu}>
                    {items.map(item => (
                        <label key={item.id} className={styles.item}>
                            <input
                                type="checkbox"
                                checked={ selectedId === item.id }
                                onChange={() => toggle(item.id)}
                            />
                            <span>{item.label}</span>
                        </label>
                    ))}

                    {(selectedId ?? 0) > 0 && (
                        <button
                            type="button"
                            className={styles.reset}
                            onClick={() => onChange(null)}
                        >
                            Сбросить
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
