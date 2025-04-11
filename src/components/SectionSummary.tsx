import { useMemo } from "react";
import { SectionData, ChoiceData, NumericChoiceData } from "../types";
import { useMorality, useSelectedChoices } from "../hooks/useMoralityContext";
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SectionSummaryProps {
    section: SectionData;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

export default function SectionSummary({ section, isExpanded, onToggleExpand }: SectionSummaryProps) {
    const { state } = useMorality();
    const selectedChoices = useSelectedChoices();

    const stats = useMemo(() => {
        let totalChoices = 0;
        let completedChoices = 0;
        let paragonPoints = 0;
        let renegadePoints = 0;

        const processChoice = (choice: ChoiceData | NumericChoiceData) => {
            totalChoices++;

            if (choice.id in selectedChoices) {
                completedChoices++;

                if ("type" in choice && choice.type === "numeric") {
                    if (selectedChoices[choice.id].startsWith("numeric_")) {
                        const value = parseInt(selectedChoices[choice.id].split("_")[1], 10);

                        if (choice.paragonPerUnit) {
                            paragonPoints += Math.floor(value * choice.paragonPerUnit);
                        }

                        if (choice.renegadePerUnit) {
                            const inverseValue = choice.maxValue - value;
                            renegadePoints += Math.floor(inverseValue * choice.renegadePerUnit);
                        }
                    }
                } else {
                    const selectedOption = choice.options.find((option) => selectedChoices[choice.id] === option.id);

                    if (selectedOption) {
                        paragonPoints += selectedOption.paragon || 0;
                        renegadePoints += selectedOption.renegade || 0;
                    }
                }
            }
        };

        section.groups.forEach((group) => {
            group.choices.forEach(processChoice);
        });

        return {
            completedChoices,
            completionPercentage: totalChoices > 0 ? Math.round((completedChoices / totalChoices) * 100) : 0,
            paragonPoints,
            renegadePoints,
            totalChoices,
        };
    }, [section, selectedChoices]);

    const hasHiddenChoices = useMemo(() => {
        let foundHidden = false;

        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                if (state.hiddenChoices.has(choice.id)) {
                    foundHidden = true;
                }
            });
        });

        return foundHidden;
    }, [section, state.hiddenChoices]);

    return (
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    onClick={onToggleExpand}
                    className="mr-2 rounded-full p-1 hover:bg-gray-200"
                    aria-label={isExpanded ? "Collapse section" : "Expand section"}
                >
                    {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                </button>

                {stats.completedChoices > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" />
                        <span>
                            {stats.completedChoices} / {stats.totalChoices} choices complete (
                            {stats.completionPercentage}%) {hasHiddenChoices && " • Some choices hidden"}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-4 text-sm">
                {stats.paragonPoints > 0 && (
                    <span className="font-medium text-sky-600">+{stats.paragonPoints} Paragon</span>
                )}

                {stats.renegadePoints > 0 && (
                    <span className="font-medium text-red-600">+{stats.renegadePoints} Renegade</span>
                )}
            </div>
        </div>
    );
}
