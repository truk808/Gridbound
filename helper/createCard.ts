import {CARDS_CONFIG} from "../config/cards.config";
import {Card} from "../backend/models/Card";

export function createCard(configKey: keyof typeof CARDS_CONFIG): Card {
    const config = CARDS_CONFIG[configKey];
    return new Card(
        config.id,
        config.name,
        config.description,
        config.apCost,
        config.radius,
        config.image,
        config.actions,
    );
}