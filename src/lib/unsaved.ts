import { writable } from "svelte/store"; 
import type { GameDataUpdater } from "./update-models/game-data";

let gameData: GameDataUpdater = {};

export const unsaved = writable(gameData);