import { useCallback, useEffect, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { ChoiceDependencyData, MoralityScores, MoralityState, OptionDependencyData } from "../types";
import { storage } from "../utils/storage";
import {
    isOptionDependencyMet as checkOptionDependencyMet,
    isChoiceDependencyMet as checkChoiceDependencyMet,
    isChoiceExplicitlyLocked as checkChoiceExplicitlyLocked,
} from "../utils/dependencyUtils";
import { calculateAvailablePoints } from "../utils/moralityCalculator";

const STORAGE_KEY = "mass-effect-morality-state";

export function useMoralityState() {
    const initialState = (): MoralityState => {
        if (typeof window === "undefined") return { hiddenChoices: new Set(), selectedChoices: {} };

        const savedState = storage.getItem(STORAGE_KEY);

        if (savedState) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const parsedState = JSON.parse(savedState);

                return {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                    hiddenChoices: new Set(parsedState.hiddenChoices),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    selectedChoices: parsedState.selectedChoices,
                };
            } catch (error) {
                console.error("Error parsing saved state:", error);
            }
        }

        return { hiddenChoices: new Set(), selectedChoices: {} };
    };

    const [state, setState] = useState<MoralityState>(initialState);
    const [showHiddenChoices, setShowHiddenChoices] = useState(false);

    useEffect(() => {
        const serializable = {
            hiddenChoices: Array.from(state.hiddenChoices),
            selectedChoices: state.selectedChoices,
        };

        storage.setItem(STORAGE_KEY, JSON.stringify(serializable));
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
                });
            });
        });

        const { availableParagon, availableRenegade } = calculateAvailablePoints(
            gameChoicesData,
            state.selectedChoices,
        );

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
    }, [state.selectedChoices, isChoiceDependencyMet, isOptionDependencyMet]);

    const handleOptionSelect = useCallback((choiceId: string, optionId: string): void => {
        setState((prev) => ({
            ...prev,
            selectedChoices: {
                ...prev.selectedChoices,
                [choiceId]: optionId,
            },
        }));
    }, []);

    const hideChoice = useCallback((choiceId: string): void => {
        setState((prev) => {
            const newHiddenChoices = new Set(prev.hiddenChoices);
            newHiddenChoices.add(choiceId);
            return {
                ...prev,
                hiddenChoices: newHiddenChoices,
            };
        });
    }, []);

    const showChoice = useCallback((choiceId: string): void => {
        setState((prev) => {
            const newHiddenChoices = new Set(prev.hiddenChoices);
            newHiddenChoices.delete(choiceId);
            return {
                ...prev,
                hiddenChoices: newHiddenChoices,
            };
        });
    }, []);

    const toggleShowHiddenChoices = useCallback(() => {
        setShowHiddenChoices((prev) => !prev);
    }, []);

    const resetState = useCallback(() => {
        setState({ hiddenChoices: new Set(), selectedChoices: {} });
    }, []);

    return {
        handleOptionSelect,
        hideChoice,
        isChoiceDependencyMet,
        isChoiceExplicitlyLocked,
        isOptionDependencyMet,
        resetState,
        scores,
        showChoice,
        showHiddenChoices,
        state,
        toggleShowHiddenChoices,
    };
}
