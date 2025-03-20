import { OptionData } from "../types";

interface OptionProps {
    choiceId: string;
    option: OptionData;
    isSelected: boolean;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

export default function Option({
    choiceId,
    option,
    isSelected,
    handleOptionSelect,
}: OptionProps) {
    const fullOptionId = `${choiceId}_${option.id}`;
    const inputId = `option_${fullOptionId}`;
    const labelId = `label_${fullOptionId}`;

    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={inputId}
                name={inputId}
                checked={isSelected}
                onChange={() => { handleOptionSelect(choiceId, option.id); }}
                className="mr-2"
                aria-labelledby={labelId}
            />
            <label
                id={labelId}
                htmlFor={inputId}
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
};
