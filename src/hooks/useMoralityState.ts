import { useCallback, useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import { MoralityState, OptionData } from "../types";

export function useMoralityState() {
    const [state, setState] = useState<MoralityState>({
        selectedChoices: {},
    });

    const choicesMap = useMemo(() => {
        const map = new Map<string, Map<string, OptionData>>();

        gameChoicesData.forEach((section) => {
            section.groups.forEach((group) => {
                group.choices.forEach((choice) => {
                    const optionsMap = new Map<string, OptionData>();

                    choice.options.forEach((option) => {
                        optionsMap.set(option.id, option);
                    });

                    map.set(choice.id, optionsMap);
                });
            });
        });

        return map;
    }, []);

    const scores = useMemo(() => {
        let totalParagon = 0;
        let totalRenegade = 0;

        Object.entries(state.selectedChoices).forEach(([choiceId, optionId]) => {
            const optionsMap = choicesMap.get(choiceId);

            if (optionsMap) {
                const option = optionsMap.get(optionId);

                if (option) {
                    totalParagon += option.paragon || 0;
                    totalRenegade += option.renegade || 0;
                }
            }
        });

        return {
            paragon: totalParagon,
            renegade: totalRenegade,
        };
    }, [state.selectedChoices, choicesMap]);

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
