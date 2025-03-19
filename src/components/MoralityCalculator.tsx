import React, { useState, useMemo } from "react";
import gameChoicesData from "../data/gameChoices";
import {
    ChoiceOption,
    MoralityState,
} from "../types";

const MoralityCalculator: React.FC = () => {
    const [state, setState] = useState<MoralityState>({
        completedChoices: [],
        currentProgress: "game-start",
        selectedChoices: {},
    });

    const updateState = <K extends keyof MoralityState>(
        key: K,
        value: MoralityState[K],
    ): void => {
        setState(prev => ({ ...prev, [key]: value }));
    };

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

    const { paragonScore, renegadeScore } = useMemo(() => {
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

    const handleOptionSelect = (choiceId: string, optionId: string): void => {
        updateState("selectedChoices", {
            ...state.selectedChoices,
            [choiceId]: optionId,
        });
    };

    return (
        <div className="bg-gray-50 max-w-6xl mx-auto p-6 rounded-lg shadow-md">
            <h1 className="font-bold mb-6 text-3xl text-center">Mass Effect Morality Calculator</h1>

            <div className="bg-gray-100 mb-8 p-4 rounded-lg shadow">
                <h2 className="font-bold mb-3 text-xl">Current Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Paragon */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="font-semibold text-sky-700">Paragon: {paragonScore} points</span>
                        </div>
                        <div className="bg-gray-300 h-4 rounded-full w-full">
                            <div className="bg-sky-600 h-4 rounded-full" style={{ width: `${Math.min(100, Math.round((paragonScore / 629) * 100))}%` }}></div>
                        </div>
                    </div>

                    {/* Renegade */}
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="font-semibold text-red-700">
                                Renegade: {renegadeScore} points
                            </span>
                        </div>
                        <div className="bg-gray-300 h-4 rounded-full w-full">
                            <div className="bg-red-600 h-4 rounded-full" style={{ width: `${Math.min(100, Math.round((renegadeScore / 629) * 100))}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                {gameChoicesData.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-white p-4 rounded-lg shadow">
                        <h2 className="border-b font-bold mb-3 pb-2 text-xl">{section.section}</h2>

                        {section.info && (
                            <p className="mb-4 text-gray-700 italic">{section.info}</p>
                        )}

                        <div className="space-y-4">
                            {section.choices.map(choice => (
                                <div key={choice.id} className="bg-gray-50 border p-3 rounded">
                                    <h3 className="font-semibold mb-2">{choice.title}</h3>

                                    <div className="space-y-1">
                                        {choice.options.map(option => (
                                            <div key={`${choice.id}-${option.id}`} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`option-${choice.id}-${option.id}`}
                                                    name={`choice-${choice.id}`}
                                                    checked={state.selectedChoices[choice.id] === option.id}
                                                    onChange={() => handleOptionSelect(choice.id, option.id)}
                                                    className="mr-2"
                                                />
                                                <label
                                                    htmlFor={`option-${choice.id}-${option.id}`}
                                                    className="flex-1"
                                                >
                                                    {option.label}
                                                    {(option.paragon > 0 || option.renegade > 0) && (
                                                        <span className="ml-2">
                                                            {option.paragon > 0 && (
                                                                <span className="text-sky-600">+{option.paragon} Paragon</span>
                                                            )}
                                                            {option.paragon > 0 && option.renegade > 0 && " / "}
                                                            {option.renegade > 0 && (
                                                                <span className="text-red-600">+{option.renegade} Renegade</span>
                                                            )}
                                                        </span>
                                                    )}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoralityCalculator;
