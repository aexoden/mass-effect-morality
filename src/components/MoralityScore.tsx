import { useEffect, useState } from "react";
import {
    BookmarkIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
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

    if (result === 100 && value < 1.0) {
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

    const paragonWidth = `${(paragonRatio * 100).toString()}%`;
    const renegadeWidth = `${(renegadeRatio * 100).toString()}%`;
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

function getMoralityLabel(scores: MoralityScores): string {
    const difference = scores.paragon - scores.renegade;
    const total = scores.paragon + scores.renegade;

    if (total < 20) return "Undefined";

    if (difference > 80) return "Pure Paragon";
    if (difference > 40) return "Paragon";
    if (difference > 10) return "Mostly Paragon";

    if (difference < -80) return "Pure Renegade";
    if (difference < -40) return "Renegade";
    if (difference < -10) return "Mostly Renegade";

    return "Neutral";
}

function getAlignmentColor(scores: MoralityScores): string {
    const alignment = getMoralityLabel(scores);

    if (alignment.includes("Paragon")) return "text-sky-600";
    if (alignment.includes("Renegade")) return "text-red-600";
    return "text-gray-300";
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

    const moralityLabel = getMoralityLabel(scores);
    const alignmentColor = getAlignmentColor(scores);

    return (
        <div className={`mb-8 w-full rounded-lg p-6 shadow-lg ${getBackgroundGradient()}`}>
            <h2 className="mb-4 text-2xl font-bold">Current Morality Tracker</h2>
            <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-medium">
                        Moral Alignment: <span className={alignmentColor}>{moralityLabel}</span>
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
                    <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="absolute h-6 rounded-full bg-sky-600/20 transition-all duration-500"
                            style={{ width: percentages.maxParagonWidth }}
                        ></div>
                        <div
                            className="flex h-6 items-center justify-end rounded-full bg-sky-600 pr-2 text-xs font-medium text-white transition-all duration-500"
                            style={{ width: percentages.paragonWidth }}
                        >
                            {percentages.paragonRatio > 0.15 && percentages.paragonPercentage}
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

interface MoralityScoreWidgetProps {
    scores: MoralityScores;
    onClose: () => void;
    onPin: () => void;
    isPinned?: boolean;
}

export function MoralityScoreWidget({ scores, onClose, onPin, isPinned }: MoralityScoreWidgetProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastParagon, setLastParagon] = useState(scores.paragon);
    const [lastRenegade, setLastRenegade] = useState(scores.renegade);
    const [paragonChanged, setParagonChanged] = useState(false);
    const [renegadeChanged, setRenegadeChanged] = useState(false);

    useEffect(() => {
        if (scores.paragon !== lastParagon) {
            setParagonChanged(true);
            setLastParagon(scores.paragon);
            setTimeout(() => {
                setParagonChanged(false);
            }, 2000);
        }
    }, [scores.paragon, lastParagon]);

    useEffect(() => {
        if (scores.renegade !== lastRenegade) {
            setRenegadeChanged(true);
            setLastRenegade(scores.renegade);
            setTimeout(() => {
                setRenegadeChanged(false);
            }, 2000);
        }
    }, [scores.renegade, lastRenegade]);

    const moralityLabel = getMoralityLabel(scores);
    const alignmentColor = getAlignmentColor(scores);
    const percentages = calculateMoralityPercentages(scores);

    return (
        <div className="bg-opacity-95 fixed right-4 bottom-4 z-50 w-72 rounded-lg bg-gray-800 text-white shadow-lg backdrop-blur-sm transition-all duration-300">
            <div className="flex items-center justify-between rounded-t-lg bg-gray-700 px-3 py-2">
                <div className="flex items-center">
                    <span className="mr-2 h-3 w-3 rounded-full bg-gradient-to-r from-sky-400 to-red-400"></span>
                    <h3 className="text-lg font-bold">Morality Status</h3>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                        }}
                        className="rounded p-1 text-gray-300 hover:bg-gray-600 hover:text-white"
                        aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                        {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </button>
                    <button
                        onClick={onPin}
                        className={`rounded p-1 hover:bg-gray-600 ${isPinned ? "text-yellow-400" : "text-gray-300 hover:text-white"}`}
                        aria-label={isPinned ? "Unpin widget" : "Pin widget"}
                    >
                        <BookmarkIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded p-1 text-gray-300 hover:bg-gray-600 hover:text-white"
                        aria-label="Close widget"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Moral Alignment Display */}
            <div className="border-b border-gray-700 px-3 py-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Alignment:</span>
                    <span className={`font-bold ${alignmentColor}`}>{moralityLabel}</span>
                </div>
            </div>

            {/* Scores */}
            <div className="px-3 py-2">
                <div className="mb-3">
                    <div className="mb-1 flex justify-between">
                        <span
                            className={`flex items-center text-sm font-medium text-sky-500 ${paragonChanged ? "animate-pulse" : ""}`}
                        >
                            <CheckCircleIcon className="mr-1 h-4 w-4" />
                            Paragon
                        </span>
                        <span className="text-sm font-medium text-sky-500">
                            {scores.paragon} ({percentages.paragonPercentage})
                        </span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
                        <div
                            className="absolute h-2 rounded-full bg-sky-500/20 transition-all duration-500"
                            style={{ width: percentages.maxParagonWidth }}
                        ></div>
                        <div
                            className={`absolute h-2 rounded-full bg-sky-500 transition-all duration-500 ${paragonChanged ? "animate-pulse" : ""}`}
                            style={{ width: percentages.paragonWidth }}
                        ></div>
                    </div>
                </div>
                <div>
                    <div className="mb-1 flex justify-between">
                        <span
                            className={`flex items-center text-sm font-medium text-red-500 ${renegadeChanged ? "animate-pulse" : ""}`}
                        >
                            <ExclamationTriangleIcon className="mr-1 h-4 w-4" />
                            Renegade
                        </span>
                        <span className="text-sm font-medium text-red-500">
                            {scores.renegade} ({percentages.renegadePercentage})
                        </span>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-gray-700">
                        <div
                            className="absolute h-2 rounded-full bg-red-500/20"
                            style={{ width: percentages.maxRenegadeWidth }}
                        ></div>
                        <div
                            className={`absolute h-2 rounded-full bg-red-500 transition-all duration-500 ${renegadeChanged ? "animate-pulse" : ""}`}
                            style={{ width: percentages.renegadeWidth }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-gray-700 px-3 py-2">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-gray-400">Available Paragon</p>
                            <p className="font-medium text-sky-200">{scores.availableParagon} points</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Available Renegade</p>
                            <p className="font-medium text-red-200">{scores.availableRenegade} points</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Max Potential</p>
                            <p className="font-medium text-sky-200">{percentages.maxParagonPercentage}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Max Potential</p>
                            <p className="font-medium text-red-200">{percentages.maxRenegadePercentage}</p>
                        </div>
                    </div>

                    <div className="mt-2 rounded border border-gray-600 bg-gray-900 p-2 text-xs text-gray-300">
                        <p className="mb-1 font-medium text-white">Special Effects:</p>
                        {scores.bonusCharm > 0 && (
                            <p className="flex items-center text-sky-300">
                                <CheckCircleIcon className="mr-1 h-3 w-3" />+{scores.bonusCharm} Charm
                            </p>
                        )}
                        {scores.bonusIntimidate > 0 && (
                            <p className="flex items-center text-red-300">
                                <CheckCircleIcon className="mr-1 h-3 w-3" />+{scores.bonusIntimidate} Intimidate
                            </p>
                        )}
                        {percentages.paragonRatio >= 0.8 && (
                            <p className="flex items-center text-sky-300">
                                <ShieldCheckIcon className="mr-1 h-3 w-3" />
                                Paragon Mission Unlocked{` ${percentages.paragonRatio >= 0.9 ? "" : "(if first)"}`}
                            </p>
                        )}
                        {percentages.renegadeRatio >= 0.8 && (
                            <p className="flex items-center text-sky-300">
                                <ShieldCheckIcon className="mr-1 h-3 w-3" />
                                Renegade Mission Unlocked{` ${percentages.renegadeRatio >= 0.9 ? "" : "(if first)"}`}
                            </p>
                        )}
                        {scores.bonusCharm === 0 && scores.bonusIntimidate === 0 && (
                            <p className="text-gray-400">None</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
