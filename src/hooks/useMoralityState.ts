import { useCallback, useEffect, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { MoralityScores, MoralityState, OptionDependencyData } from "../types";
import { storage } from "../utils/storage";

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
            // If there are no dependencies, they are met.
            if (!dependsOn || dependsOn.length === 0) {
                return true;
            }

            // Each option can provide a list of dependencies to meet. Only one of the items needs to be met. Each
            // individual dependency itself consists of an optional talent requirement and an optional list of choices
            // that must be made to meet the dependency. If defined, both the talent requirement and the list of choices
            // must be met. However, as with the list as a whole, only one of the items in the choice list must be met.
            // The explicitOnly parameter controls whether or not a choice with no selection made at all is considered
            // a pass or not. This is to allow actual scored points to be considered separately from points that are
            // still potentially available. (You only count a point as scored if any required dependency was actually
            // selected, but a point remains available as long as its path hasn't been explicitly ruled out.)
            return dependsOn.some((dep) => {
                let choiceMet = true;

                if (dep.dependsOn) {
                    choiceMet = dep.dependsOn.some((dep) => {
                        // If only considering explicitly set dependencies, and the dependency has no choice selected,
                        // treat the dependency as met.
                        if (explicitOnly && !(dep.choiceId in state.selectedChoices)) {
                            return true;
                        }

                        return state.selectedChoices[dep.choiceId] === dep.optionId;
                    });
                }

                return choiceMet;
            });
        },
        [state.selectedChoices],
    );

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

                        if (selectedOption && isOptionDependencyMet(selectedOption.dependsOn, false)) {
                            totalParagon += selectedOption.paragon || 0;
                            totalRenegade += selectedOption.renegade || 0;
                        }
                    }

                    if (!hasExplicitlyUnmetDependency && !(choice.id in state.selectedChoices)) {
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
    }, [state.selectedChoices, isOptionDependencyMet]);

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
