import { Fragment } from "react";
import { OptionDependencyData, OptionData } from "../types";

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

    const renderDependency = (dep: OptionDependencyData, index: number) => {
        return (
            <Fragment key={index}>
                {index > 0 && <span className="mx-1 text-gray-500">OR</span>}
                <span>
                    {dep.requiredTalent && (
                        <span className={dep.requiredTalent.talent === "charm" ? "text-sky-500" : "text-red-500"}>
                            {dep.requiredTalent.talent.charAt(0).toUpperCase() + dep.requiredTalent.talent.slice(1)}{" "}
                            {dep.requiredTalent.points}
                        </span>
                    )}
                    {dep.requiredTalent && dep.dependsOn && <span className="text-gray-500"> + </span>}
                    {dep.dependsOn && <span className="text-gray-500">Prior choice</span>}
                </span>
            </Fragment>
        );
    };

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
                <span className={isDisabled ? "line-through" : ""}>{option.label}</span>
                {(option.paragon > 0 || option.renegade > 0 || (option.dependsOn && option.dependsOn.length > 0)) && (
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
                                (Requires {option.dependsOn.map(renderDependency)})
                            </span>
                        )}
                    </span>
                )}
            </label>
        </div>
    );
}
