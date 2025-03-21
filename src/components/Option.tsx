import { Fragment } from "react";
import { OptionData } from "../types";

interface OptionProps {
    choiceId: string;
    option: OptionData;
    isSelected: boolean;
    isDisabled: boolean;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
}

export default function Option({ choiceId, option, isSelected, isDisabled, handleOptionSelect }: OptionProps) {
    const fullOptionId = `${choiceId}_${option.id}`;
    const inputId = `option_${fullOptionId}`;
    const labelId = `label_${fullOptionId}`;

    return (
        <div className="flex items-center">
            <div className="relative flex items-center">
                <input
                    type="radio"
                    id={inputId}
                    name={`choice_${choiceId}`}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => {
                        handleOptionSelect(choiceId, option.id);
                    }}
                    className="transition-colors"
                    aria-labelledby={labelId}
                />
            </div>
            <label
                id={labelId}
                htmlFor={inputId}
                className={`ml-2 flex-1 ${!isDisabled ? "cursor-pointer" : ""} transition-colors ${isSelected ? "font-medium text-blue-800" : "text-gray-700"}`}
            >
                {option.label}
                {(option.paragon > 0 || option.renegade > 0) && (
                    <span className="ml-2">
                        {option.paragon > 0 && (
                            <span className="font-medium text-sky-600">+{option.paragon} Paragon</span>
                        )}
                        {option.paragon > 0 && option.renegade > 0 && " / "}
                        {option.renegade > 0 && (
                            <span className="font-medium text-red-600">+{option.renegade} Renegade</span>
                        )}
                        {option.dependsOn && option.dependsOn.length > 0 && (
                            <span className="ml-2 text-sm text-gray-500">
                                (Requires{" "}
                                {option.dependsOn.map((dep, index) => (
                                    <Fragment key={index}>
                                        {index > 0 && <span> OR </span>}
                                        <span className={dep.talent === "charm" ? "text-sky-500" : "text-red-500"}>
                                            {dep.talent.charAt(0).toUpperCase() + dep.talent.slice(1)} {dep.points}
                                        </span>
                                    </Fragment>
                                ))}
                                )
                            </span>
                        )}
                    </span>
                )}
            </label>
        </div>
    );
}
