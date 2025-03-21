import { useState } from "react";
import MoralityScore, { MoralityScoreWidget } from "./MoralityScore";
import Section from "./Section";
import { useMoralityState } from "../hooks/useMoralityState";
import gameChoicesData from "../data/gameChoices";

export default function MoralityCalculator() {
    const { handleOptionSelect, resetState, state, scores } = useMoralityState();
    const [showWidget, setShowWidget] = useState(true);

    return (
        <div className="mx-auto max-w-6xl rounded-lg bg-gray-50 p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-700">Options</span>
                    <button
                        className="ml-4 rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={() => {
                            setShowWidget(!showWidget);
                        }}
                    >
                        {showWidget ? "Hide" : "Show"} Floating Score
                    </button>
                    <button
                        className="ml-4 rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={() => {
                            resetState();
                        }}
                    >
                        Reset Data
                    </button>
                </div>
            </div>

            {showWidget && <MoralityScoreWidget scores={scores} />}

            <MoralityScore scores={scores} />

            <div className="space-y-8">
                {gameChoicesData.map((section) => (
                    <Section
                        key={section.id}
                        section={section}
                        selectedChoices={state.selectedChoices}
                        handleOptionSelect={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
}
