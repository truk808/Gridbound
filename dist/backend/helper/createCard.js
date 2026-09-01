"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = createCard;
const cards_config_1 = require("../../config/cards.config");
const Card_1 = require("../models/Card");
function createCard(configKey) {
    const config = cards_config_1.CARDS_CONFIG[configKey];
    return new Card_1.Card(config.id, config.name, config.description, config.apCost, config.radius, config.image, config.actions);
}
