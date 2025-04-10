import { useState, useEffect } from "react";
import { NumericChoiceData } from "../types";
import { useMorality, useSelectedChoices } from "../hooks/useMoralityContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface NumericChoiceProps {
    choiceId: string;
    choice: NumericChoiceData;
    hasUnmetDependency: boolean;
}

export default function NumericChoice({ choiceId, choice, hasUnmetDependency }: NumericChoiceProps) {
    const { handleOptionSelect } = useMorality();
    const selectedChoices = useSelectedChoices();

    const hasBeenSelected = choiceId in selectedChoices;

    const storedValue = hasBeenSelected
        ? parseInt(selectedChoices[choiceId].split("_")[1], 10)
        : (choice.defaultValue ?? 0);

    const [value, setValue] = useState(storedValue);
    const [isEditing, setIsEditing] = useState(false);

    const paragonPoints = choice.paragonPerUnit ? Math.floor(value * choice.paragonPerUnit) : 0;
    const renegadePoints = choice.renegadePerUnit ? Math.floor((choice.maxValue - value) * choice.renegadePerUnit) : 0;

    const handleChange = (newValue: number) => {
        const boundedValue = Math.max(choice.minValue, Math.min(choice.maxValue, newValue));
        setValue(boundedValue);
        setIsEditing(true);
    };

    const handleConfirm = () => {
        handleOptionSelect(choiceId, `numeric_${value.toString()}`);
        setIsEditing(false);
    };

    useEffect(() => {
        if (hasUnmetDependency) {
            setIsEditing(false);
        }
    }, [hasUnmetDependency]);

    return (
        <div
            className={`rounded border p-3 transition ${hasUnmetDependency ? "bg-gray-100 opacity-50" : hasBeenSelected ? "bg-gray-50" : "border-dashed border-gray-300 bg-gray-50"}`}
        >
            {choice.description && (
                <p className={`mb-3 italic ${hasUnmetDependency ? "text-gray-500" : "text-gray-700"}`}>
                    {choice.description}
                </p>
            )}

            {!hasBeenSelected && !hasUnmetDependency && (
                <div className="mb-3 flex items-center rounded-md bg-amber-50 px-3 py-2 text-amber-700">
                    <InformationCircleIcon className="mr-2 h-5 w-5" />
                    <span className="text-sm font-medium">
                        No selection yet - adjust slider and confirm to commit your choice
                    </span>
                </div>
            )}

            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{choice.label}</span>
                    <span className="font-medium text-gray-800">
                        {value} / {choice.maxValue}
                    </span>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => {
                            handleChange(value - 1);
                        }}
                        disabled={value <= choice.minValue || hasUnmetDependency}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Decrease value"
                    >
                        <span className="text-xl font-medium">−</span>
                    </button>

                    <div className="flex-1">
                        <input
                            type="range"
                            min={choice.minValue}
                            max={choice.maxValue}
                            value={value}
                            onChange={(e) => {
                                handleChange(parseInt(e.target.value, 10));
                            }}
                            disabled={hasUnmetDependency}
                            className={`"h-2 w-full cursor-pointer appearance-none rounded-lg ${hasBeenSelected ? "bg-gray-200 accent-blue-600" : "bg-amber-100 accent-amber-500"}`}
                        />
                        <div className="mt-1 flex justify-between">
                            <div className="text-xs text-gray-500">{choice.minLabel}</div>
                            <div className="text-xs text-gray-500">{choice.maxLabel}</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            handleChange(value + 1);
                        }}
                        disabled={value >= choice.maxValue || hasUnmetDependency}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Increase value"
                    >
                        <span className="text-xl font-medium">+</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div
                    className={`rounded p-2 ${hasBeenSelected ? "border border-sky-100 bg-sky-50" : "border border-gray-200 bg-gray-50"}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700">{choice.paragonLabel}</span>
                        <span className={`font-medium ${hasBeenSelected ? "text-sky-600" : "text-gray-600"}`}>
                            {value}
                        </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-gray-700">Paragon</span>
                        <span className={`font-medium ${hasBeenSelected ? "text-sky-600" : "text-gray-600"}`}>
                            +{paragonPoints}
                        </span>
                    </div>
                </div>

                <div
                    className={`rounded p-2 ${hasBeenSelected ? "border border-red-100 bg-red-50" : "border border-gray-200 bg-gray-50"}`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700">{choice.renegadeLabel}</span>
                        <span className={`font-medium ${hasBeenSelected ? "text-red-600" : "text-gray-600"}`}>
                            {choice.maxValue - value}
                        </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-gray-700">Renegade</span>
                        <span className={`font-medium ${hasBeenSelected ? "text-red-600" : "text-gray-600"}`}>
                            +{renegadePoints}
                        </span>
                    </div>
                </div>
            </div>

            {(isEditing || !hasBeenSelected) && !hasUnmetDependency && (
                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        {hasBeenSelected ? "Update Choice" : "Confirm Choice"}
                    </button>
                </div>
            )}

            {choice.note && <p className="mt-3 text-sm text-gray-500 italic">{choice.note}</p>}
        </div>
    );
}
