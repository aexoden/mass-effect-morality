import React from "react";
import { ChoiceOption as ChoiceOptionType } from "../types";

interface ChoiceOptionProps {
    choiceId: string;
    option: ChoiceOptionType;
    isSelected: boolean;
    onSelect: (_choiceId: string, _optionId: string) => void;
}

const ChoiceOption = React.memo<ChoiceOptionProps>(({
    choiceId,
    option,
    isSelected,
    onSelect,
}) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={`option-${choiceId}-${option.id}`}
                name={`choice-${choiceId}`}
                checked={isSelected}
                onChange={() => { onSelect(choiceId, option.id); }}
                className="mr-2"
                aria-labelledby={`label-${choiceId}-${option.id}`}
            />
            <label
                id={`label-${choiceId}-${option.id}`}
                htmlFor={`option-${choiceId}-${option.id}`}
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
    );
});

export default ChoiceOption;
