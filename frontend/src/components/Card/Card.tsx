import styles from "./Card.module.css";

interface CardProps {
    ap?: number;
    name?: string;
    image?: string;
    description?: string;
    isSelected?: boolean;
}

export const Card = ({
                         ap = 4,
                         name = "Карта 4",
                         image = "/assets/card/sword.png",
                         description = "Наносит 2 ед урона",
                         isSelected = false,
                     }: CardProps) => {
    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ""}`}>
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
};