import Option from "./Option";
import { ChoiceData, OptionData } from "../types";

interface ChoiceProps {
    choice: ChoiceData;
    selectedChoices: Record<string, string>;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

const skipOption: OptionData = {
    id: "skip",
    label: "(Skip this choice)",
    paragon: 0,
    renegade: 0,
};

export default function Choice({
    choice,
    selectedChoices,
    handleOptionSelect,
}: ChoiceProps) {
    return (
        <div className="bg-gray-50 border p-3 rounded">
            {choice.description && (
                <p className="mb-3 text-gray-700 italic">{choice.description}</p>
            )}

            <div className="space-y-1">
                {choice.options.map(option => (
                    <Option
                        key={option.id}
                        choiceId={choice.id}
                        option={option}
                        isSelected={selectedChoices[choice.id] === option.id}
                        handleOptionSelect={handleOptionSelect}
                    />
                ))}

                {choice.isForced ?? (
                    <Option
                        key={skipOption.id}
                        choiceId={choice.id}
                        option={skipOption}
                        isSelected={selectedChoices[choice.id] === skipOption.id}
                        handleOptionSelect={handleOptionSelect}
                    />
                )}
            </div>
        </div>
    );
}
