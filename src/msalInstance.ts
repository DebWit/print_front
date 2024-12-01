import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig";

let msalInstance: PublicClientApplication | null = null;

export const getMsalInstance = async (): Promise<PublicClientApplication> => {
    if (!msalInstance) {
        msalInstance = new PublicClientApplication(msalConfig);
        await msalInstance.initialize();
    }
    return msalInstance;
};
