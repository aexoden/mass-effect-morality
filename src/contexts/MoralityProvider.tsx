import { ReactNode } from "react";
import { MoralityContext } from "./MoralityContext";
import { useMoralityState } from "../hooks/useMoralityState";

interface MoralityProviderProps {
    children: ReactNode;
}

export function MoralityProvider({ children }: MoralityProviderProps) {
    const moralityState = useMoralityState();

    return <MoralityContext.Provider value={moralityState}>{children}</MoralityContext.Provider>;
}
