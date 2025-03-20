import { useCallback, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { ChoiceOption, MoralityState } from "../types";

export function useMoralityState() {
    const [state, setState] = useState<MoralityState>({
        completedChoices: [],
        currentProgress: "game-start",
        selectedChoices: {},
    });

    const choicesLookup = useMemo(() => {
        const lookup: Map<string, Map<string, ChoiceOption>> = new Map();

        gameChoicesData.forEach((section) => {
            section.choices.forEach((choice) => {
                const optionsMap = new Map<string, ChoiceOption>();
                choice.options.forEach((option) => {
                    optionsMap.set(option.id, option);
                });

                lookup.set(choice.id, optionsMap);
            });
        });

        return lookup;
    }, []);

    const scores = useMemo(() => {
        let totalParagon = 0;
        let totalRenegade = 0;

        Object.entries(state.selectedChoices).forEach(([choiceId, optionId]) => {
            const optionsMap = choicesLookup.get(choiceId);

            if (optionsMap) {
                const option = optionsMap.get(optionId);

                if (option) {
                    totalParagon += option.paragon || 0;
                    totalRenegade += option.renegade || 0;
                }
            }
        });

        return {
            paragonScore: totalParagon,
            renegadeScore: totalRenegade,
        };
    }, [state.selectedChoices, choicesLookup]);

    const handleOptionSelect = useCallback((choiceId: string, optionId: string): void => {
        setState(prev => ({
            ...prev,
            selectedChoices: {
                ...prev.selectedChoices,
                [choiceId]: optionId,
            },
        }));
    }, []);

    return { handleOptionSelect, scores, state };
}
