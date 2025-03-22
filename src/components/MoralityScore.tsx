import { MoralityScores } from "../types";

interface MoralityPercentages {
    paragonPercentage: string;
    renegadePercentage: string;
    maxParagonPercentage: string;
    maxRenegadePercentage: string;
    paragonWidth: string;
    renegadeWidth: string;
    maxParagonWidth: string;
    maxRenegadeWidth: string;
}

function formatRoundedRatio(value: number): string {
    const result = Math.round(value * 100);

    if (result === 100 && value < 100) {
        return "<100%";
    } else {
        return `${result.toString()}%`;
    }
}

function calculateMoralityPercentages(scores: MoralityScores): MoralityPercentages {
    const paragonRatio = Math.min(1.0, scores.paragon / scores.barLength);
    const renegadeRatio = Math.min(1.0, scores.renegade / scores.barLength);
    const maxParagonRatio = Math.min(1.0, (scores.paragon + scores.availableParagon) / scores.barLength);
    const maxRenegadeRatio = Math.min(1.0, (scores.renegade + scores.availableRenegade) / scores.barLength);

    const paragonPercentage = formatRoundedRatio(paragonRatio);
    const renegadePercentage = formatRoundedRatio(renegadeRatio);
    const maxParagonPercentage = formatRoundedRatio(maxParagonRatio);
    const maxRenegadePercentage = formatRoundedRatio(maxRenegadeRatio);

    const paragonWidth = `${((paragonRatio * 100) / maxParagonRatio).toString()}%`;
    const renegadeWidth = `${((renegadeRatio * 100) / maxRenegadeRatio).toString()}%`;
    const maxParagonWidth = `${(maxParagonRatio * 100).toString()}%`;
    const maxRenegadeWidth = `${(maxRenegadeRatio * 100).toString()}%`;

    return {
        maxParagonPercentage,
        maxParagonWidth,
        maxRenegadePercentage,
        maxRenegadeWidth,
        paragonPercentage,
        paragonWidth,
        renegadePercentage,
        renegadeWidth,
    };
}

interface MoralityScoreProps {
    scores: MoralityScores;
}

export default function MoralityScore({ scores }: MoralityScoreProps) {
    const percentages = calculateMoralityPercentages(scores);

    return (
        <div className="mb-8 rounded-lg bg-gray-100 p-4 shadow">
            <h2 className="mb-3 text-xl font-bold">Current Status</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-sky-700">
                            Paragon: {scores.paragon} points
                            {scores.availableParagon > 0 &&
                                ` (with ${scores.availableParagon.toString()} still available)`}
                        </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-300">
                        <div
                            className="h-4 w-full rounded-full bg-sky-600/15"
                            style={{ width: percentages.maxParagonWidth }}
                        >
                            <div
                                className="h-4 rounded-full bg-sky-600"
                                style={{ width: percentages.paragonWidth }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-red-700">
                            Renegade: {scores.renegade} points
                            {scores.availableRenegade > 0 &&
                                ` (with ${scores.availableRenegade.toString()} still available)`}
                        </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-gray-300">
                        <div
                            className="h-4 w-full rounded-full bg-red-600/15"
                            style={{ width: percentages.maxRenegadeWidth }}
                        >
                            <div
                                className="h-4 rounded-full bg-red-600"
                                style={{ width: percentages.renegadeWidth }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MoralityScoreWidget({ scores }: MoralityScoreProps) {
    const percentages = calculateMoralityPercentages(scores);

    return (
        <div className="fixed right-4 bottom-4 z-50 w-64 rounded-lg bg-gray-800 p-3 text-white shadow-lg">
            <h3 className="mb-2 text-center text-lg font-bold">Current Scores</h3>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-sky-400">Paragon: {scores.paragon}</span>
                    <span className="font-semibold text-sky-400">
                        {percentages.paragonPercentage} / {percentages.maxParagonPercentage}
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 w-full rounded-full bg-sky-500/25"
                        style={{ width: percentages.maxParagonWidth }}
                    >
                        <div
                            className="h-3 rounded-full bg-sky-500"
                            style={{ width: percentages.paragonWidth }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-red-400">Renegade: {scores.renegade}</span>
                    <span className="font-semibold text-red-400">
                        {percentages.renegadePercentage} / {percentages.maxRenegadePercentage}
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 w-full rounded-full bg-red-500/25"
                        style={{ width: percentages.maxRenegadeWidth }}
                    >
                        <div
                            className="h-3 rounded-full bg-red-500"
                            style={{ width: percentages.renegadeWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
