import { MoralityScores } from "../types";

interface MoralityScoreProps {
    scores: MoralityScores;
}

export default function MoralityScore({ scores }: MoralityScoreProps) {
    const paragonPercentage = Math.min(100, Math.round((scores.paragon / scores.barLength) * 100));
    const renegadePercentage = Math.min(100, Math.round((scores.renegade / scores.barLength) * 100));

    const maxParagonPercentage = Math.min(
        100,
        Math.round(((scores.paragon + scores.availableParagon) / scores.barLength) * 100),
    );
    const maxRenegadePercentage = Math.min(
        100,
        Math.round(((scores.renegade + scores.availableRenegade) / scores.barLength) * 100),
    );

    const paragonWidth = `${((paragonPercentage * 100) / maxParagonPercentage).toString()}%`;
    const renegadeWidth = `${((renegadePercentage * 100) / maxRenegadePercentage).toString()}%`;

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
                            style={{ width: `${maxParagonPercentage.toString()}%` }}
                        >
                            <div
                                className="h-4 rounded-full bg-sky-600"
                                style={{ width: paragonWidth }}
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
                            style={{ width: `${maxRenegadePercentage.toString()}%` }}
                        >
                            <div
                                className="h-4 rounded-full bg-red-600"
                                style={{ width: renegadeWidth }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MoralityScoreWidget({ scores }: MoralityScoreProps) {
    const paragonPercentage = Math.min(100, Math.round((scores.paragon / scores.barLength) * 100));
    const renegadePercentage = Math.min(100, Math.round((scores.renegade / scores.barLength) * 100));

    const displayParagonPercentage =
        paragonPercentage === 100 && scores.paragon < scores.barLength ? "<100" : paragonPercentage.toString();
    const displayRenegadePercentage =
        renegadePercentage === 100 && scores.renegade < scores.barLength ? "<100" : renegadePercentage.toString();

    const maxParagonPercentage = Math.min(
        100,
        Math.round(((scores.paragon + scores.availableParagon) / scores.barLength) * 100),
    );
    const maxRenegadePercentage = Math.min(
        100,
        Math.round(((scores.renegade + scores.availableRenegade) / scores.barLength) * 100),
    );

    const displayMaxParagonPercentage =
        maxParagonPercentage === 100 && scores.paragon + scores.availableParagon < scores.barLength
            ? "<100"
            : maxParagonPercentage.toString();
    const displayMaxRenegadePercentage =
        maxRenegadePercentage === 100 && scores.renegade + scores.availableRenegade < scores.barLength
            ? "<100"
            : maxRenegadePercentage.toString();

    const paragonWidth = `${((paragonPercentage * 100) / maxParagonPercentage).toString()}%`;
    const renegadeWidth = `${((renegadePercentage * 100) / maxRenegadePercentage).toString()}%`;

    return (
        <div className="fixed right-4 bottom-4 z-50 w-64 rounded-lg bg-gray-800 p-3 text-white shadow-lg">
            <h3 className="mb-2 text-center text-lg font-bold">Current Scores</h3>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-sky-400">Paragon: {scores.paragon}</span>
                    <span className="font-semibold text-sky-400">
                        {displayParagonPercentage}% / {displayMaxParagonPercentage}%
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 w-full rounded-full bg-sky-500/25"
                        style={{ width: `${maxParagonPercentage.toString()}%` }}
                    >
                        <div
                            className="h-3 rounded-full bg-sky-500"
                            style={{ width: paragonWidth }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="mb-2">
                <div className="mb-1 flex justify-between">
                    <span className="font-semibold text-red-400">Renegade: {scores.renegade}</span>
                    <span className="font-semibold text-red-400">
                        {displayRenegadePercentage}% / {displayMaxRenegadePercentage}%
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-600">
                    <div
                        className="h-3 w-full rounded-full bg-red-500/25"
                        style={{ width: `${maxRenegadePercentage.toString()}%` }}
                    >
                        <div
                            className="h-3 rounded-full bg-red-500"
                            style={{ width: renegadeWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
