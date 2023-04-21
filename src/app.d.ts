// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("$lib/server/lucia").Auth;
	type UserAttributes = {
        email: string;
    };
}

/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
        interface Locals {
            validate: import("@lucia-auth/sveltekit").Validate;
            validateUser: import("@lucia-auth/sveltekit").ValidateUser;
            setSession: import("@lucia-auth/sveltekit").SetSession;
        }
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
