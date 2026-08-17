import {CARDS_CONFIG} from "../config/cards.config.ts";
import {Card} from "../models/Card.ts";

export function createCard(configKey: keyof typeof CARDS_CONFIG): Card {
    const config = CARDS_CONFIG[configKey];

    return new Card(
        config.id,
        config.name,
        config.description,
        config.apCost,
        config.image,
        config.actions,
        config.radius,
    );
}