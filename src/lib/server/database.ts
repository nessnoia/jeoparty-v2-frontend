import * as mongodb from "mongodb";
import type { GameInfo } from "$lib/database-models/game-info";
import type { GameData } from "$lib/database-models/game-data";

interface GameCode {
    _id?: mongodb.ObjectId;
    code: string;
}

export const collections: {
    gamesInfo?: mongodb.Collection<GameInfo>;
    gamesData?: mongodb.Collection<GameData>;
    gameCodes?: mongodb.Collection<GameCode>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("jeoparty");
    await applySchemaValidation(db);

    const gamesInfoCollection = db.collection<GameInfo>("gamesInfo");
    collections.gamesInfo = gamesInfoCollection;

    const gamesDataCollection = db.collection<GameData>("gamesData");
    collections.gamesData = gamesDataCollection; 
    
    const gameCodesCollection = db.collection<GameCode>("gameCodes");
    collections.gameCodes = gameCodesCollection;    
}

async function applySchemaValidation(db: mongodb.Db) {
    const gamesInfoSchema = {
        $gamesInfoSchema: {
            bsonType: "object",
            required: ["gameTitle", "boardType", "ownedBy", "numRounds", "numQuestionsTotal"],
            additionalProperties: false,
            properties: {
                _id: {},
                gameTitle: {
                    bsonType: "string",
                    description: "'gameTitle' is required and is a string",
                },
                boardType: {
                    bsonType: "string",
                    description: "'boardType' is required and is one of 'custom' or 'standard'",
                    enum: ["custom", "standard"],
                },
                ownedBy: {
                    bsonType: "object",
                    description: "'ownedBy' is required and is an id",
                },
                numRounds: {
                    bsonType: "int",
                    minimum: 0,
                    description: "'numRounds' is required and is an int",
                },
                numQuestionsTotal: {
                    bsonType: "int",
                    minimum: 0,
                    description: "'numQuestionsTotal' is required and is an int",
                }
            }
        }
    };

    const gamesDataSchema = {
        $gamesDataSchema: {
            bsonType: "object",
            required: ["gameTitle", "rounds"],
            additionalProperties: false,
            properties: {
                _id: {},
                gameTitle: {
                    bsonType: "string",
                    description: "'gameTitle' is required and is a string"
                },
                rounds: {
                    bsonType: ["array"],
                    minItems: 1,
                    maxItems: 5,
                    items: {
                        bsonType: ["object"],
                        required: ["id", "num", "title", "type", "categories"],
                        additionalProperties: false,
                        description: "'rounds' must contain the stated fields.",
                        properties: {
                            id: {
                                bsonType: "string",
                                description: "'id' is required and is of string type",
                            },
                            num: {
                                bsonType: "int",
                                minimum: 1,
                                maximum: 5,
                                description: "'num' is required and is of int type",
                            },
                            title: {
                                bsonType: "string",
                                description: "'title' is required and is of string type",
                            },
                            type: {
                                bsonType: "string",
                                enum: ["normal", "final"],
                                description: "'type' is required and has value of 'normal' or 'final'",
                            },
                            maxDailyDoubles: {
                                bsonType: "int",
                                description: "'maxDailyDoubles' is required and is of int type",
                            },
                            categories: {
                                bsonType: ["array"],
                                minItems: 1,
                                maxItems: 8,
                                items: {
                                    bsonType: ["object"],
                                    required: ["id", "category", "clues"],
                                    additionalProperties: false,
                                    description: "'categories' must contain the stated fields.",
                                    properties: {
                                        id: {
                                            bsonType: "string",
                                            description: "'id' is required and is of string type",
                                        },
                                        category: {
                                            bsonType: "string",
                                            description: "'category' is required and is of string type",
                                        },
                                        clues: {
                                            bsonType: ["array"],
                                            minItems: 1,
                                            maxItems: 10,
                                            items: {
                                                bsonType: ["object"],
                                                required: ["id", "clue", "answer"],
                                                additionalProperties: false,
                                                description: "'clues' must contain the stated fields.",
                                                properties: {
                                                    id: {
                                                        bsonType: "string",
                                                        description: "'id' is required and is of string type",
                                                    },
                                                    value: {
                                                        bsonType: "int",
                                                        description: "'value' is optional and is of int type",
                                                    },
                                                    clue: {
                                                        bsonType: "string",
                                                        description: "'clue' is required and is of string type",
                                                    },
                                                    clueImage: {
                                                        bsonType: "string",
                                                        description: "'clueImage' is an optional field and should be a url",
                                                    },
                                                    answer: {
                                                        bsonType: "string",
                                                        description: "'answer' is required and is of string type",
                                                    },
                                                    isDailyDouble: {
                                                        bsonType: "boolean",
                                                        description: "'isDailyDouble' is optional and is of boolean type",
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    await db.command({
        collMod: "gamesInfo",
        validator: gamesInfoSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("gamesInfo", {validator: gamesInfoSchema});
        }
    });

    await db.command({
        collMod: "gamesData",
        validator: gamesDataSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("gamesData", {validator: gamesDataSchema});
        }
    })
}