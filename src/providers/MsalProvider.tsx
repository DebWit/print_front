'use client';

import React from "react";
import { MsalProvider, MsalAuthenticationTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default function MsalProviderWrapper({ children }: { children: React.ReactNode }) {
    return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}