export interface ChoiceDependencyData {
    choiceId: string;
    optionIds: string[];
}

export interface TalentDependencyData {
    talent: "charm" | "intimidate";
    points: number;
}

export interface OptionDependencyData {
    requiredTalent?: TalentDependencyData;
    dependsOn?: ChoiceDependencyData[];
}

export interface OptionData {
    id: string;
    label: string;
    paragon: number;
    renegade: number;
    dependsOn?: OptionDependencyData[];
}

export interface NumericChoiceData {
    id: string;
    type: "numeric";
    label: string;
    description?: string;
    minValue: number;
    maxValue: number;
    defaultValue?: number;
    paragonPerUnit: number;
    renegadePerUnit: number;
    paragonLabel: string;
    renegadeLabel: string;
    minLabel: string;
    maxLabel: string;
    note?: string;
    dependsOn?: ChoiceDependencyData[];
}

export interface ChoiceData {
    id: string;
    description?: string;
    options: OptionData[];
    dependsOn?: ChoiceDependencyData[];
    isForced?: boolean;
    type?: "standard";
}

export interface GroupData {
    id: string;
    title: string;
    description?: string;
    choices: (ChoiceData | NumericChoiceData)[];
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
    bonusCharm: number;
    bonusIntimidate: number;
}

export interface MoralityState {
    selectedChoices: Record<string, string>;
}
