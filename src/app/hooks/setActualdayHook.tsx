// src/hooks/useActualDay.ts
import { Dispatch, SetStateAction } from "react";

let hook: Dispatch<SetStateAction<number>>;

export const setActualDayHook = (setActualDay: Dispatch<SetStateAction<number>>) => {
    hook = setActualDay;
};

export const getActualDayHook = () => hook;
