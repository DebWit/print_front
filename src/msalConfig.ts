import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "9c068bd5-6495-4396-81a4-3b6fe6f03332",
        authority: "https://login.microsoftonline.com/c49e1939-4b53-4738-bb64-41fb2990e41c",
        redirectUri: "http://localhost:3001/home",
    },
};

export const loginRequest = {
    scopes: ["User.Read"],
};