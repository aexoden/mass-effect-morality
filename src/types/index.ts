export interface ChoiceDependencyData {
    choiceId: string;
    optionId: string;
}

export interface OptionDependencyData {
    talent: "charm" | "intimidate";
    points: number;
    dependsOn?: ChoiceDependencyData;
}

export interface OptionData {
    id: string;
    label: string;
    paragon: number;
    renegade: number;
    dependsOn?: OptionDependencyData[];
}

export interface ChoiceData {
    id: string;
    description?: string;
    options: OptionData[];
    dependsOn?: ChoiceDependencyData[];
    isForced?: boolean;
}

export interface GroupData {
    id: string;
    title: string;
    description?: string;
    choices: ChoiceData[];
}

export interface SectionData {
    id: string;
    title: string;
    description?: string;
    groups: GroupData[];
}

export interface MoralityScores {
    barLength: number;
    paragon: number;
    renegade: number;
    availableParagon: number;
    availableRenegade: number;
}

export interface MoralityState {
    selectedChoices: Record<string, string>;
}
