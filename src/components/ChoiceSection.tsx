import React from "react";
import { ChoiceSection as ChoiceSectionType, ChoiceOption as ChoiceOptionType } from "../types";
import ChoiceOption from "./ChoiceOption";

interface ChoiceSectionProps {
    section: ChoiceSectionType;
    selectedChoices: Record<string, string>;
    onOptionSelect: (_choiceId: string, _optionId: string) => void;
}

const ChoiceSection: React.FC<ChoiceSectionProps> = ({
    section,
    selectedChoices,
    onOptionSelect,
}) => {
    const skipOption: ChoiceOptionType = {
        id: "skip",
        label: "(Skip this choice)",
        paragon: 0,
        renegade: 0,
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="border-b font-bold mb-3 pb-2 text-xl">{section.section}</h2>

            {section.info && (
                <p className="mb-4 text-gray-700 italic">{section.info}</p>
            )}

            <div className="space-y-4">
                {section.choices.map(choice => (
                    <div key={choice.id} className="bg-gray-50 border p-3 rounded">
                        <h3 className="font-semibold mb-2">{choice.title}</h3>

                        {choice.info && (
                            <p className="mb-3 text-gray-700 italic">{choice.info}</p>
                        )}

                        <div className="space-y-1">
                            {choice.options.map(option => (
                                <ChoiceOption
                                    key={`${choice.id}-${option.id}`}
                                    choiceId={choice.id}
                                    option={option}
                                    isSelected={selectedChoices[choice.id] === option.id}
                                    onSelect={onOptionSelect}
                                />
                            ))}

                            {choice.isForced ?? (
                                <ChoiceOption
                                    key={`${choice.id}-skip`}
                                    choiceId={choice.id}
                                    option={skipOption}
                                    isSelected={selectedChoices[choice.id] === "skip"}
                                    onSelect={onOptionSelect}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoiceSection;
