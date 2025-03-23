import { useMemo } from "react";
import Option from "./Option";
import { ChoiceData, OptionData } from "../types";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useSelectedChoices } from "../hooks/useMoralityContext";

interface ChoiceProps {
    choice: ChoiceData;
}

const skipOption: OptionData = {
    id: "skip",
    label: "(Skip this choice)",
    paragon: 0,
    renegade: 0,
};

export default function Choice({ choice }: ChoiceProps) {
    const selectedChoices = useSelectedChoices();

    const hasUnmetDependency = useMemo(() => {
        if (
            choice.dependsOn &&
            choice.dependsOn.length > 0 &&
            choice.dependsOn.some((dep) => !dep.optionIds.includes(selectedChoices[dep.choiceId]))
        ) {
            return true;
        } else {
            return false;
        }
    }, [choice.dependsOn, selectedChoices]);

    return (
        <div
            className={`rounded border p-3 transition ${hasUnmetDependency ? "relative border-red-200 bg-gray-100" : "bg-gray-50"}`}
        >
            {hasUnmetDependency && (
                <div className="absolute top-2 right-2 text-red-500">
                    <LockClosedIcon className="size-5" />
                </div>
            )}

            {hasUnmetDependency && (
                <p className="mb-3 flex items-center text-red-600">
                    <ExclamationCircleIcon className="mr-1 size-5" />
                    <span className="font-medium">You must make other choices first to unlock this option.</span>
                </p>
            )}

            {choice.description && (
                <p className={`mb-3 italic ${hasUnmetDependency ? "text-gray-500" : "text-gray-700"}`}>
                    {choice.description}
                </p>
            )}

            <div className={`space-y-1 ${hasUnmetDependency ? "opacity-50" : ""}`}>
                {choice.options.map((option) => (
                    <Option
                        key={option.id}
                        choiceId={choice.id}
                        option={option}
                        hasUnmetDependency={hasUnmetDependency}
                    />
                ))}

                {choice.isForced ?? (
                    <Option
                        key={skipOption.id}
                        choiceId={choice.id}
                        option={skipOption}
                        hasUnmetDependency={hasUnmetDependency}
                    />
                )}
            </div>
        </div>
    );
}
