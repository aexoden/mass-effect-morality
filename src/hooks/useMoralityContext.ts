import { useContext } from "react";
import { MoralityContext, MoralityContextData } from "../contexts/MoralityContext";

export function useMorality(): MoralityContextData {
    const context = useContext(MoralityContext);

    if (context === undefined) {
        throw new Error("useMorality must be used within a MoralityProvider");
    }

    return context;
}

export function useSelectedChoices(): Record<string, string> {
    const { state } = useMorality();
    return state.selectedChoices;
}
