import styles from "./Card.module.css";
import {observer} from "mobx-react-lite";

interface CardProps {
    onClick: () => void;
    ap?: number;
    name?: string;
    image?: string;
    description?: string;
    isSelected?: boolean;
}

export const Card = observer(({
                         onClick,
                         ap = 4,
                         name = "Карта 4",
                         image = "/assets/card/sword.png",
                         description = "Наносит 2 ед урона",
                         isSelected = false,
                     }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.card} ${isSelected ? styles.selected : ""}`}
        >
            <div className={styles.header}>
                <div className={styles.ap}>{ap}</div>
                <span className={styles.title}>{name}</span>
            </div>

            <div className={styles.imageFrame}>
                <img src={image} alt={name} className={styles.image} />
            </div>

            <div className={styles.divider} />

            <div className={styles.descriptionZone}>
                <p className={styles.descriptionText}>{description}</p>
            </div>
        </div>
    );
});