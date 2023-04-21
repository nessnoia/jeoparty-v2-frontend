import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import mongoose from 'mongoose';
import { dev } from "$app/environment";
import google from "@lucia-auth/oauth/google";
import github from "@lucia-auth/oauth/github";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "$env/static/private";

const userSchema = new mongoose.Schema({
        _id: {
            type: String
        },
        email: {
            type: String
        }
    },
    { _id: false }
);

const sessionSchema = new mongoose.Schema({
        _id: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        },
        active_expires: {
            type: Number,
            required: true
        },
        idle_expires: {
            type: Number,
            required: true
        }
    },
    { _id: false }
);

const keySchema = new mongoose.Schema({
        _id: {
            type: String
        },
        user_id: {
            type: String,
            required: true
        },
        hashed_password: String,
        primary: {
            type: Boolean,
            required: true
        },
        expires: Number
    },
    { _id: false }
);

const User = mongoose.models.user || mongoose.model('user', userSchema);
const Session = mongoose.models.session || mongoose.model('session', sessionSchema);
const Key = mongoose.models.key || mongoose.model('key', keySchema);

export const auth = lucia({
    User, Session, Key,
	adapter: adapter(mongoose),
	env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
		return {
			userId: userData.id,
			email: userData.email
		};
	}
});

export const googleAuth = google(auth, {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_REDIRECT_URI
});

export const githubAuth = github(auth, {
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET
})

export type Auth = typeof auth;