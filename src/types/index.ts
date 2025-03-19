// Skill requirement for dialog options
export interface SkillRequirement {
    type: "charm" | "intimidate";
    level: number;
}

// Option in a choice
export interface ChoiceOption {
    id: string;
    label: string;
    paragon: number;
    renegade: number;
    requiresSkill?: SkillRequirement;
}

// Dependency on another choice
export interface ChoiceDependency {
    choiceId: string;
    optionIndex?: number;
}

// Individual choice
export interface Choice {
    id: string;
    title: string;
    requiredBackground?: "spacer" | "colonist" | "earthborn";
    isOptional?: boolean;
    dependsOn?: ChoiceDependency;
    options: ChoiceOption[];
}

// Section of choices
export interface ChoiceSection {
    section: string;
    choices: Choice[];
    info?: string;
}

// Component state types
export interface MoralityState {
    currentProgress: string;
    selectedChoices: Record<string, string>;
    completedChoices: string[];
}
