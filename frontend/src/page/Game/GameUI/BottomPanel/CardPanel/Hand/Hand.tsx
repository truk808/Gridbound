import styles from "../CardPanel.module.css";
import {Card} from "../../../../../../components/Card/Card.tsx";
import type {ICardDTO} from "../../../../../../../../types/ICard.ts";

interface HandProps {
    cards: ICardDTO[],
    removeCard: (id: string) => void,
    onClickHandle: (card: ICardDTO) => void,
    selectedCard: ICardDTO | null,
}

export const Hand = ({cards, removeCard, onClickHandle, selectedCard}: HandProps) => {
    return (
        <div className={styles.hand}>
            {
                cards.map((card: ICardDTO) => {
                    return <Card
                        id={card.instanceId}
                        onClose={(id: string) => removeCard(id)}
                        onClick={() => onClickHandle(card)}
                        key={`hand-${card.instanceId}`}
                        image={card.image}
                        name={card.name}
                        isSelected={selectedCard?.instanceId === card.instanceId}
                        description={card.description}
                        ap={card.apCost}
                    />
                })
            }
        </div>
    );
};

