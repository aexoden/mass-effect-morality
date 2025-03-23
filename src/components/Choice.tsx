import { useMemo } from "react";
import Option from "./Option";
import { ChoiceData, OptionData } from "../types";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useMorality } from "../hooks/useMoralityContext";

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
    const { isChoiceDependencyMet } = useMorality();

    const hasUnmetDependency = useMemo(() => {
        return !isChoiceDependencyMet(choice.dependsOn);
    }, [choice.dependsOn, isChoiceDependencyMet]);

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
