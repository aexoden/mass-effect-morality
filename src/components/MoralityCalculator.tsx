import React from "react";
import MoralityScore from "./MoralityScore";
import ChoiceSection from "./ChoiceSection";
import { useMoralityState } from "../hooks/useMoralityState";
import gameChoicesData from "../data/gameChoices";

const MoralityCalculator: React.FC = () => {
    const { handleOptionSelect, state, scores } = useMoralityState();

    return (
        <div className="bg-gray-50 max-w-6xl mx-auto p-6 rounded-lg shadow-md">
            <h1 className="font-bold mb-6 text-3xl text-center">Mass Effect Morality Calculator</h1>

            <MoralityScore paragonScore={scores.paragonScore} renegadeScore={scores.renegadeScore} />

            <div className="space-y-8">
                {gameChoicesData.map((section, sectionIndex) => (
                    <ChoiceSection
                        key={sectionIndex}
                        section={section}
                        selectedChoices={state.selectedChoices}
                        onOptionSelect={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default MoralityCalculator;
