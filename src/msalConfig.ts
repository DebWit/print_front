import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "9c068bd5-6495-4396-81a4-3b6fe6f03332",
        authority: "https://login.microsoftonline.com/c49e1939-4b53-4738-bb64-41fb2990e41c/v2.0",
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3001/home",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};