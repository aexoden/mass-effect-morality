import MoralityScore, { MoralityScoreWidget } from "./MoralityScore";
import Section from "./Section";
import { useMoralityState } from "../hooks/useMoralityState";
import gameChoicesData from "../data/gameChoices";

export default function MoralityCalculator() {
    const { handleOptionSelect, state, scores } = useMoralityState();

    return (
        <div className="mx-auto max-w-6xl rounded-lg bg-gray-50 p-6 shadow-md">
            <h1 className="mb-6 text-center text-3xl font-bold">Mass Effect Morality Calculator</h1>

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
