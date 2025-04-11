import { useState } from "react";
import MoralityScore, { MoralityScoreWidget } from "./MoralityScore";
import Section from "./Section";
import gameChoicesData from "../data/gameChoices";
import { MoralityProvider } from "../contexts/MoralityProvider";
import { useMorality } from "../hooks/useMoralityContext";
import MoralityDependencyTester from "./MoralityDependencyTester";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function MoralityCalculatorContent() {
    const { resetState, scores, toggleShowHiddenChoices, showHiddenChoices, state } = useMorality();
    const [showWidget, setShowWidget] = useState(true);
    const [isPinned, setIsPinned] = useState(false);
    const [showTestTools, setShowTestTools] = useState(false);

    const hiddenChoicesCount = state.hiddenChoices.size;

    return (
        <div className="mx-auto max-w-6xl rounded-lg bg-gray-50 p-6 shadow-md">
            <div className="mb-8 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow">
                <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-700">Options</span>
                    <button
                        className="rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={() => {
                            setShowWidget(!showWidget);
                        }}
                    >
                        {showWidget ? "Hide" : "Show"} Floating Score
                    </button>
                    <button
                        className="rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={() => {
                            resetState();
                        }}
                    >
                        Reset Data
                    </button>
                    <button
                        className="rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={() => {
                            setShowTestTools(!showTestTools);
                        }}
                    >
                        {showTestTools ? "Hide" : "Show"} Test Tools
                    </button>
                    <button
                        className="flex items-center rounded bg-blue-200 px-3 py-1 text-sm transition hover:bg-blue-300"
                        onClick={toggleShowHiddenChoices}
                    >
                        {showHiddenChoices ? (
                            <>
                                <EyeSlashIcon className="mr-1 h-4 w-4" />
                                Hide Dismissed ({hiddenChoicesCount})
                            </>
                        ) : (
                            <>
                                <EyeIcon className="mr-1 h-4 w-4" />
                                Show Dismissed ({hiddenChoicesCount})
                            </>
                        )}
                    </button>
                </div>
            </div>

            {showTestTools && (
                <div className="mb-8">
                    <MoralityDependencyTester />
                </div>
            )}

            {showWidget && (
                <MoralityScoreWidget
                    scores={scores}
                    onClose={() => {
                        setShowWidget(false);
                    }}
                    onPin={() => {
                        setIsPinned(!isPinned);
                    }}
                    isPinned={isPinned}
                />
            )}

            <MoralityScore scores={scores} />

            <div className="space-y-8">
                {gameChoicesData.map((section) => (
                    <Section
                        key={section.id}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
}

export default function MoralityCalculator() {
    return (
        <MoralityProvider>
            <MoralityCalculatorContent />
        </MoralityProvider>
    );
}
