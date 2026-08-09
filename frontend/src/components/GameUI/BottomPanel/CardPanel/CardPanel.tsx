import styles from "./CardPanel.module.css"
import {Card} from "../../../Card/Card.tsx";
import {useStore} from "../../../../store/RootStore.ts";

export const CardPanel = () => {
    const {cardStore} = useStore()

    return (
        <div className={styles.cardPanel}>
            <div className={styles.deck}>Колода</div>
            <div className={styles.hand}>
                {
                    cardStore.getHand().map((card) => (
                        <Card
                            key={`hand-${card.id}`}
                            image={card.image}
                            name={card.name}
                            isSelected={cardStore.getSelectedCard()?.id === card.id}
                            description={card.description}
                            ap={card.apCost}
                        />
                    ))
                }
            </div>
            <div className={styles.deck}>Сброс</div>
        </div>
    );
};

