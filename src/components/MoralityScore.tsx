import { MoralityScores } from "../types";

interface MoralityPercentages {
    paragonRatio: number;
    renegadeRatio: number;
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
        paragonRatio,
        paragonWidth,
        renegadePercentage,
        renegadeRatio,
        renegadeWidth,
    };
}

interface MoralityScoreProps {
    scores: MoralityScores;
}

export default function MoralityScore({ scores }: MoralityScoreProps) {
    const percentages = calculateMoralityPercentages(scores);

    const getBackgroundGradient = (): string => {
        if (scores.paragon > scores.renegade * 2) {
            return "bg-gradient-to-r from-sky-100 to-white";
        } else if (scores.renegade > scores.paragon * 2) {
            return "bg-gradient-to-r from-red-100 to-white";
        } else if (scores.paragon > scores.renegade) {
            return "bg-gradient-to-r from-sky-50 to-white";
        } else if (scores.renegade > scores.paragon) {
            return "bg-gradient-to-r from-red-50 to-white";
        }

        return "bg-white";
    };

    const getMoralityLabel = (): string => {
        const difference = scores.paragon - scores.renegade;
        const total = scores.paragon + scores.renegade;

        if (total < 20) return "Undefined";

        if (difference > 50) return "Paragon";
        if (difference > 20) return "Mostly Paragon";
        if (difference < -50) return "Renegade";
        if (difference < -20) return "Mostly Renegade";

        return "Neutral";
    };

    const moralityLabel = getMoralityLabel();

    return (
        <div className={`mb-8 w-full rounded-lg p-6 shadow-lg ${getBackgroundGradient()}`}>
            <h2 className="mb-4 text-2xl font-bold">Current Morality Tracker</h2>
            <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-medium">
                        Moral Alignment:{" "}
                        <span
                            className={
                                moralityLabel === "Paragon" || moralityLabel === "Mostly Paragon"
                                    ? "text-sky-600"
                                    : moralityLabel === "Renegade" || moralityLabel === "Mostly Renegade"
                                      ? "text-red-600"
                                      : "text-gray-600"
                            }
                        >
                            {moralityLabel}
                        </span>
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-sky-700">
                            Paragon: {scores.paragon} points
                            {scores.availableParagon > 0 && ` (${scores.availableParagon.toString()} more available)`}
                        </span>
                        <span className="font-medium">{percentages.paragonPercentage}</span>
                    </div>
                    <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-6 rounded-full bg-sky-600/20 transition-all duration-500"
                            style={{ width: percentages.maxParagonWidth }}
                        >
                            <div
                                className="flex h-6 items-center justify-end rounded-full bg-sky-600 pr-2 text-xs font-medium text-white transition-all duration-500"
                                style={{ width: percentages.paragonWidth }}
                            >
                                {percentages.paragonRatio > 0.15 && percentages.paragonPercentage}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mb-1 flex justify-between">
                        <span className="font-semibold text-red-700">
                            Renegade: {scores.renegade} points
                            {scores.availableRenegade > 0 && ` (${scores.availableRenegade.toString()} more available)`}
                        </span>
                        <span className="font-medium">{percentages.renegadePercentage}</span>
                    </div>
                    <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-6 rounded-full bg-red-600/20 transition-all duration-500"
                            style={{ width: percentages.maxRenegadeWidth }}
                        >
                            <div
                                className="flex h-6 items-center justify-end rounded-full bg-red-600 pr-2 text-xs font-medium text-white transition-all duration-500"
                                style={{ width: percentages.renegadeWidth }}
                            >
                                {percentages.renegadeRatio > 0.15 && percentages.renegadePercentage}
                            </div>
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
