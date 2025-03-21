import { useCallback, useEffect, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { MoralityScores, MoralityState } from "../types";

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
                    choice.options.forEach((option) => {
                        if (!(choice.id in state.selectedChoices)) {
                            availableParagon += option.paragon || 0;
                            availableRenegade += option.renegade || 0;
                        }

                        if (state.selectedChoices[choice.id] === option.id) {
                            totalParagon += option.paragon || 0;
                            totalRenegade += option.renegade || 0;
                        }
                    });
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

    return { handleOptionSelect, resetState, scores, state };
}
