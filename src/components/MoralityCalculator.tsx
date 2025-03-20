import React from "react";
import MoralityScore, { MoralityScoreWidget } from "./MoralityScore";
import Section from "./Section";
import { useMoralityState } from "../hooks/useMoralityState";
import gameChoicesData from "../data/gameChoices";

const MoralityCalculator: React.FC = () => {
    const { handleOptionSelect, state, scores } = useMoralityState();

    return (
        <div className="bg-gray-50 max-w-6xl mx-auto p-6 rounded-lg shadow-md">
            <h1 className="font-bold mb-6 text-3xl text-center">Mass Effect Morality Calculator</h1>

            {/*
              * TODO: Maximum scores are only 340 if the player lands on Asteroid X57. Technically, these aren't actual
              * maximum scores, but reflect the score needed to fully fill the bar. The game keeps track of the actual
              * score regardless.
              */}

            <MoralityScoreWidget
                scores={scores}
                paragonMax={340}
                renegadeMax={340}
            />

            <MoralityScore
                scores={scores}
                paragonMax={340}
                renegadeMax={340}
            />

            <div className="space-y-8">
                {gameChoicesData.map(section => (
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
};

export default MoralityCalculator;
