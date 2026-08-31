import styles from "../CardPanel.module.css";
import {Card} from "../../../../../../components/Card/Card.tsx";
import Modal from "../../../../../../components/ui/modal/Modal.tsx";
import type {ICardDTO} from "../../../../../../../../types/ICard.ts";

interface DeckModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    cards: ICardDTO[];
}

export const DeckModal = ({isOpen, setIsOpen, cards}: DeckModalProps) => {
    return (
        <Modal
            active={isOpen}
            setActive={setIsOpen}
        >
            <div className={styles.a}>
                {
                    cards.map((card: ICardDTO) => {
                        return <Card
                            key={card.instanceId}
                            id={card.instanceId}
                            onClose={(id) => (id)}
                            onClick={() => {}}
                            isSelected={false}
                            name={card.name}
                            image={card.image}
                            ap={card.apCost}
                            description={card.description}
                        />
                    })
                }
            </div>
        </Modal>
    );
};

