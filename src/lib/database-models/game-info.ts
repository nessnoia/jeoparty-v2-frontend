import type * as mongodb from "mongodb";

export interface GameInfo {
    _id?: mongodb.ObjectId;
	gameTitle: string;
	boardType: "custom" | "standard";
	ownedBy: string;
	numRounds: number;
	numQuestionsTotal: number;
	tags?: [string];
}