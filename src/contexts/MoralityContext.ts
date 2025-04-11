import { createContext } from "react";
import { ChoiceDependencyData, MoralityScores, MoralityState, OptionDependencyData } from "../types";

export interface MoralityContextData {
    state: MoralityState;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
    isChoiceDependencyMet: (dependsOn: ChoiceDependencyData[] | undefined) => boolean;
    isChoiceExplicitlyLocked: (dependsOn: ChoiceDependencyData[] | undefined) => boolean;
    isOptionDependencyMet: (dependsOn: OptionDependencyData[] | undefined, explicitOnly: boolean) => boolean;
    resetState: () => void;
    scores: MoralityScores;
    hideChoice: (choiceId: string) => void;
    showChoice: (choiceId: string) => void;
    showHiddenChoices: boolean;
    toggleShowHiddenChoices: () => void;
}

export const MoralityContext = createContext<MoralityContextData | undefined>(undefined);
