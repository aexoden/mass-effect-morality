import { useCallback, useEffect, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { ChoiceDependencyData, MoralityScores, MoralityState, OptionDependencyData } from "../types";
import { storage } from "../utils/storage";
import {
    isOptionDependencyMet as checkOptionDependencyMet,
    isChoiceDependencyMet as checkChoiceDependencyMet,
    isChoiceExplicitlyLocked as checkChoiceExplicitlyLocked,
} from "../utils/dependencyUtils";

const STORAGE_KEY = "mass-effect-morality-state";

export function useMoralityState() {
    const initialState = (): MoralityState => {
        if (typeof window === "undefined") return { selectedChoices: {} };

        const savedState = storage.getItem(STORAGE_KEY);

        if (savedState) {
            try {
                return JSON.parse(savedState) as MoralityState;
            } catch (error) {
                console.error("Error parsing saved state:", error);
            }
        }

        return { selectedChoices: {} };
    };

    const [state, setState] = useState<MoralityState>(initialState);

    useEffect(() => {
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const isOptionDependencyMet = useCallback(
        (dependsOn: OptionDependencyData[] | undefined, explicitOnly: boolean): boolean => {
            return checkOptionDependencyMet(state.selectedChoices, dependsOn, explicitOnly);
        },
        [state.selectedChoices],
    );

    const isChoiceDependencyMet = useCallback(
        (dependsOn: ChoiceDependencyData[] | undefined): boolean => {
            return checkChoiceDependencyMet(state.selectedChoices, dependsOn);
        },
        [state.selectedChoices],
    );

    const isChoiceExplicitlyLocked = useCallback(
        (dependsOn: ChoiceDependencyData[] | undefined): boolean => {
            return checkChoiceExplicitlyLocked(state.selectedChoices, dependsOn);
        },
        [state.selectedChoices],
    );

    const scores = useMemo<MoralityScores>(() => {
        let totalParagon = 0;
        let totalRenegade = 0;

        let availableParagon = 0;
        let availableRenegade = 0;

        let bonusCharm = 0;
        let bonusIntimidate = 0;

        gameChoicesData.forEach((section) => {
            section.groups.forEach((group) => {
                group.choices.forEach((choice) => {
                    if (choice.id === "council-meeting-2" && choice.id in state.selectedChoices) {
                        bonusCharm += 1;
                        bonusIntimidate += 1;
                    }

                    // For actual scored points
                    const hasUnmetDependency = !isChoiceDependencyMet(choice.dependsOn);

                    // For available points - only consider explicitly failed dependencies
                    const hasExplicitlyUnmetDependency = isChoiceExplicitlyLocked(choice.dependsOn);

                    if (!hasUnmetDependency) {
                        if ("type" in choice && choice.type === "numeric") {
                            if (
                                choice.id in state.selectedChoices &&
                                state.selectedChoices[choice.id].startsWith("numeric_")
                            ) {
                                const value = parseInt(state.selectedChoices[choice.id].split("_")[1], 10);

                                if (choice.paragonPerUnit) {
                                    totalParagon += Math.floor(value * choice.paragonPerUnit);
                                }

                                if (choice.renegadePerUnit) {
                                    const inverseValue = choice.maxValue - value;
                                    totalRenegade += Math.floor(inverseValue * choice.renegadePerUnit);
                                }
                            }
                        } else {
                            const selectedOption = choice.options.find(
                                (option) => state.selectedChoices[choice.id] === option.id,
                            );

                            if (selectedOption && isOptionDependencyMet(selectedOption.dependsOn, false)) {
                                totalParagon += selectedOption.paragon || 0;
                                totalRenegade += selectedOption.renegade || 0;
                            }
                        }
                    }

                    if (!hasExplicitlyUnmetDependency && !(choice.id in state.selectedChoices)) {
                        if ("type" in choice && choice.type === "numeric") {
                            if (choice.paragonPerUnit) {
                                availableParagon += Math.floor(choice.maxValue * choice.paragonPerUnit);
                            }

                            if (choice.renegadePerUnit) {
                                availableRenegade += Math.floor(
                                    (choice.maxValue - choice.minValue) * choice.renegadePerUnit,
                                );
                            }
                        } else {
                            let maxAvailableParagon = 0;
                            let maxAvailableRenegade = 0;

                            choice.options.forEach((option) => {
                                if (isOptionDependencyMet(option.dependsOn, true)) {
                                    maxAvailableParagon = Math.max(maxAvailableParagon, option.paragon || 0);
                                    maxAvailableRenegade = Math.max(maxAvailableRenegade, option.renegade || 0);
                                }
                            });

                            availableParagon += maxAvailableParagon;
                            availableRenegade += maxAvailableRenegade;
                        }
                    }
                });
            });
        });

        const barLength = 340;
        const paragonRatio = totalParagon / barLength;
        const renegadeRatio = totalRenegade / barLength;

        if (paragonRatio >= 0.75) {
            bonusCharm += 3;
        } else if (paragonRatio >= 0.25) {
            bonusCharm += 2;
        } else if (paragonRatio >= 0.1) {
            bonusCharm += 1;
        }

        if (renegadeRatio >= 0.75) {
            bonusIntimidate += 3;
        } else if (renegadeRatio >= 0.25) {
            bonusIntimidate += 2;
        } else if (renegadeRatio >= 0.1) {
            bonusIntimidate += 1;
        }

        return {
            availableParagon,
            availableRenegade,
            barLength,
            bonusCharm,
            bonusIntimidate,
            paragon: totalParagon,
            renegade: totalRenegade,
        };
    }, [state.selectedChoices, isChoiceDependencyMet, isChoiceExplicitlyLocked, isOptionDependencyMet]);

    const handleOptionSelect = useCallback((choiceId: string, optionId: string): void => {
        setState((prev) => ({
            ...prev,
            selectedChoices: {
                ...prev.selectedChoices,
                [choiceId]: optionId,
            },
        }));
    }, []);

    const resetState = useCallback(() => {
        setState({ selectedChoices: {} });
    }, []);

    return {
        handleOptionSelect,
        isChoiceDependencyMet,
        isChoiceExplicitlyLocked,
        isOptionDependencyMet,
        resetState,
        scores,
        state,
    };
}
