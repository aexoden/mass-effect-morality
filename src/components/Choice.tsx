import { useMemo } from "react";
import Option from "./Option";
import NumericChoice from "./NumericChoice";
import { ChoiceData, NumericChoiceData, OptionData } from "../types";
import { LockClosedIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useMorality, useSelectedChoices } from "../hooks/useMoralityContext";

interface ChoiceProps {
    choice: ChoiceData | NumericChoiceData;
}

const skipOption: OptionData = {
    id: "skip",
    label: "(Skip this choice)",
    paragon: 0,
    renegade: 0,
};

export default function Choice({ choice }: ChoiceProps) {
    const { isChoiceDependencyMet, state, hideChoice, showChoice, showHiddenChoices } = useMorality();
    const selectedChoices = useSelectedChoices();

    const isChoiceSelected = choice.id in selectedChoices;
    const isChoiceHidden = state.hiddenChoices.has(choice.id);

    const showHideButton = isChoiceSelected;

    const hasUnmetDependency = useMemo(() => {
        return !isChoiceDependencyMet(choice.dependsOn);
    }, [choice.dependsOn, isChoiceDependencyMet]);

    if (isChoiceHidden && !showHiddenChoices) {
        return null;
    }

    if ("type" in choice && choice.type === "numeric") {
        return (
            <div className="relative">
                {showHideButton && (
                    <button
                        onClick={() => {
                            if (isChoiceHidden) {
                                showChoice(choice.id);
                            } else {
                                hideChoice(choice.id);
                            }
                        }}
                        className="absolute top-2 right-2 z-10 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                        aria-label={isChoiceHidden ? "Show choice" : "Hide choice"}
                    >
                        {isChoiceHidden ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                    </button>
                )}
                <NumericChoice
                    choiceId={choice.id}
                    choice={choice}
                    hasUnmetDependency={hasUnmetDependency}
                />
            </div>
        );
    }

    return (
        <div className="relative">
            {showHideButton && (
                <button
                    onClick={() => {
                        if (isChoiceHidden) {
                            showChoice(choice.id);
                        } else {
                            hideChoice(choice.id);
                        }
                    }}
                    className="absolute top-2 right-2 z-10 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    aria-label={isChoiceHidden ? "Show choice" : "Hide choice"}
                >
                    {isChoiceHidden ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
                </button>
            )}
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
        </div>
    );
}
