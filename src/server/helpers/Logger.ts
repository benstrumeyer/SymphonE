import winston = require("winston");
import {CONFIG} from "../config/Config";

winston.level = CONFIG.winston.level;

export const LOGGER = winston;