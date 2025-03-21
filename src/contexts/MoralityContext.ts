import { createContext } from "react";
import { MoralityScores, MoralityState, OptionDependencyData } from "../types";

export interface MoralityContextData {
    state: MoralityState;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
    isOptionDependencyMet: (dependsOn: OptionDependencyData[] | undefined, explicitOnly: boolean) => boolean;
    resetState: () => void;
    scores: MoralityScores;
}

export const MoralityContext = createContext<MoralityContextData | undefined>(undefined);
