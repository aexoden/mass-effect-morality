import React from "react";
import { ChoiceSection as ChoiceSectionType } from "../types";
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoiceSection;
