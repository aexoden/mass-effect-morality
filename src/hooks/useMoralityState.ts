import { useCallback, useEffect, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { MoralityScores, MoralityState, OptionDependencyData } from "../types";

const STORAGE_KEY = "mass-effect-morality-state";

export function useMoralityState() {
    const initialState = (): MoralityState => {
        if (typeof window === "undefined") return { selectedChoices: {} };

        try {
            const savedState = localStorage.getItem(STORAGE_KEY);

            if (savedState) {
                return JSON.parse(savedState) as MoralityState;
            }
        } catch (error) {
            console.error("Error loading saved state:", error);
        }

        return { selectedChoices: {} };
    };

    const [state, setState] = useState<MoralityState>(initialState);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error("Error saving state:", error);
        }
    }, [state]);

    const scores = useMemo<MoralityScores>(() => {
        let totalParagon = 0;
        let totalRenegade = 0;

        let availableParagon = 0;
        let availableRenegade = 0;

        gameChoicesData.forEach((section) => {
            section.groups.forEach((group) => {
                group.choices.forEach((choice) => {
                    // For actual scored points
                    const hasUnmetDependency =
                        choice.dependsOn &&
                        choice.dependsOn.length > 0 &&
                        !choice.dependsOn.some((dep) => state.selectedChoices[dep.choiceId] === dep.optionId);

                    // For available points - only consider explicitly failed dependencies
                    const hasExplicitlyUnmetDependency =
                        choice.dependsOn &&
                        choice.dependsOn.length > 0 &&
                        choice.dependsOn.every((dep) => {
                            // If the dependency choice is unset, don't consider it unmet
                            if (!(dep.choiceId in state.selectedChoices)) {
                                return false;
                            }

                            // Otherwise check if the selection doesn't match the requirement
                            return state.selectedChoices[dep.choiceId] !== dep.optionId;
                        });

                    if (!hasUnmetDependency) {
                        const selectedOption = choice.options.find(
                            (option) => state.selectedChoices[choice.id] === option.id,
                        );

                        if (selectedOption) {
                            totalParagon += selectedOption.paragon || 0;
                            totalRenegade += selectedOption.renegade || 0;
                        }
                    }

                    if (!hasExplicitlyUnmetDependency && !(choice.id in state.selectedChoices)) {
                        let maxAvailableParagon = 0;
                        let maxAvailableRenegade = 0;

                        choice.options.forEach((option) => {
                            maxAvailableParagon = Math.max(maxAvailableParagon, option.paragon || 0);
                            maxAvailableRenegade = Math.max(maxAvailableRenegade, option.renegade || 0);
                        });

                        availableParagon += maxAvailableParagon;
                        availableRenegade += maxAvailableRenegade;
                    }
                });
            });
        });

        return {
            availableParagon: availableParagon,
            availableRenegade: availableRenegade,
            barLength: 340,
            paragon: totalParagon,
            renegade: totalRenegade,
        };
    }, [state.selectedChoices]);

    const isOptionDependencyMet = (dependsOn?: OptionDependencyData[]): boolean => {
        if (!dependsOn || dependsOn.length === 0) {
            return true;
        }

        return dependsOn.some((dep) => {
            let choiceMet = true;

            if (dep.dependsOn) {
                choiceMet = dep.dependsOn.some((dep) => {
                    return state.selectedChoices[dep.choiceId] === dep.optionId;
                });
            }

            return choiceMet;
        });
    };

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

    return { handleOptionSelect, isOptionDependencyMet, resetState, scores, state };
}
