import { ChoiceData, ChoiceDependencyData, NumericChoiceData, SectionData } from "../types";
import { isChoiceDependencyMet, isOptionDependencyMet } from "./dependencyUtils";

interface ChoiceGraph {
    dependsOn: Map<string, ChoiceDependencyData[]>;
    dependedOnBy: Map<string, string[]>;
}

function buildChoiceGraph(gameData: SectionData[]): {
    choiceMap: Map<string, ChoiceData | NumericChoiceData>;
    dependencyGraph: ChoiceGraph;
} {
    const choiceMap = new Map<string, ChoiceData | NumericChoiceData>();
    const dependsOn = new Map<string, ChoiceDependencyData[]>();
    const dependedOnBy = new Map<string, string[]>();

    gameData.forEach((section) => {
        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                choiceMap.set(choice.id, choice);

                dependsOn.set(choice.id, choice.dependsOn ?? []);

                if (!dependedOnBy.has(choice.id)) {
                    dependedOnBy.set(choice.id, []);
                }

                if (choice.dependsOn) {
                    choice.dependsOn.forEach((dep) => {
                        if (!dependedOnBy.has(dep.choiceId)) {
                            dependedOnBy.set(dep.choiceId, []);
                        }

                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        const dependents = dependedOnBy.get(dep.choiceId)!;

                        if (!dependents.includes(choice.id)) {
                            dependents.push(choice.id);
                        }
                    });
                }

                if (!("type" in choice) || choice.type !== "numeric") {
                    choice.options.forEach((option) => {
                        if (option.dependsOn) {
                            option.dependsOn.forEach((optDep) => {
                                if (optDep.dependsOn) {
                                    optDep.dependsOn.forEach((childDep) => {
                                        if (!dependedOnBy.has(childDep.choiceId)) {
                                            dependedOnBy.set(childDep.choiceId, []);
                                        }

                                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                        const dependents = dependedOnBy.get(childDep.choiceId)!;

                                        if (!dependents.includes(choice.id)) {
                                            dependents.push(choice.id);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    });

    return {
        choiceMap,
        dependencyGraph: { dependedOnBy, dependsOn },
    };
}

function getAdjacentChoices(gameData: SectionData[]): Map<string, string[]> {
    const adjacencyList = new Map<string, string[]>();

    gameData.forEach((section) => {
        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                if (!adjacencyList.has(choice.id)) {
                    adjacencyList.set(choice.id, []);
                }

                if (choice.dependsOn) {
                    choice.dependsOn.forEach((dep) => {
                        if (!adjacencyList.has(dep.choiceId)) {
                            adjacencyList.set(dep.choiceId, []);
                        }

                        adjacencyList.get(dep.choiceId)?.push(choice.id);
                        adjacencyList.get(choice.id)?.push(dep.choiceId);
                    });
                }

                if (!("type" in choice) || choice.type !== "numeric") {
                    for (const option of choice.options) {
                        if (option.dependsOn) {
                            option.dependsOn.forEach((optDep) => {
                                if (optDep.dependsOn) {
                                    optDep.dependsOn.forEach((childDep) => {
                                        if (!adjacencyList.has(childDep.choiceId)) {
                                            adjacencyList.set(childDep.choiceId, []);
                                        }

                                        adjacencyList.get(childDep.choiceId)?.push(choice.id);
                                        adjacencyList.get(choice.id)?.push(childDep.choiceId);
                                    });
                                }
                            });
                        }
                    }
                }
            });
        });
    });

    return adjacencyList;
}

export function calculateAvailablePoints(
    gameData: SectionData[],
    selectedChoices: Record<string, string>,
): { availableParagon: number; availableRenegade: number } {
    const { choiceMap, dependencyGraph } = buildChoiceGraph(gameData);
    const choiceGroups = findChoiceGroups(gameData, choiceMap);

    let totalParagon = 0;
    let totalRenegade = 0;

    for (const group of choiceGroups) {
        const { availableParagon, availableRenegade } = calculateGroupPoints(
            group,
            choiceMap,
            dependencyGraph,
            selectedChoices,
        );

        totalParagon += availableParagon;
        totalRenegade += availableRenegade;
    }

    return { availableParagon: totalParagon, availableRenegade: totalRenegade };
}

function calculateGroupPoints(
    group: string[],
    choiceMap: Map<string, ChoiceData | NumericChoiceData>,
    dependencyGraph: ChoiceGraph,
    selectedChoices: Record<string, string>,
): { availableParagon: number; availableRenegade: number } {
    const memoParagon = new Map<string, number>();
    const memoRenegade = new Map<string, number>();

    function calculateMaxPoints(selections: Record<string, string>, targetType: "paragon" | "renegade"): number {
        const key = Object.entries(selections)
            .sort()
            .map(([k, v]) => `${k}:${v}`)
            .join("|");

        const memo = targetType === "paragon" ? memoParagon : memoRenegade;
        const memoValue = memo.get(key);
        if (memoValue !== undefined) return memoValue;

        const availableChoices = Array.from(
            group.filter((choiceId) => {
                // Skip already selected choices
                if (choiceId in selections) return false;

                // Check if all dependencies are met.
                return isChoiceDependencyMet(selections, dependencyGraph.dependsOn.get(choiceId));
            }),
        );

        if (availableChoices.length === 0) {
            memo.set(key, 0);
            return 0;
        }

        let maxPoints = 0;

        for (const choiceId of availableChoices) {
            const choice = choiceMap.get(choiceId);

            if (!choice) {
                throw new Error(`BUG: Choice ${choiceId} not found in choiceMap`);
            }

            if ("type" in choice && choice.type === "numeric") {
                // Numeric choices
                let choicePoints = 0;
                const newSelections = { ...selections };

                if (targetType === "paragon" && choice.paragonPerUnit) {
                    choicePoints = Math.floor(choice.maxValue * choice.paragonPerUnit);
                    newSelections[choiceId] = `numeric_${choice.maxValue.toString()}`;
                } else if (targetType === "renegade" && choice.renegadePerUnit) {
                    choicePoints = Math.floor((choice.maxValue - choice.minValue) * choice.renegadePerUnit);
                    newSelections[choiceId] = `numeric_${choice.minValue.toString()}`;
                }

                const subsequentPoints = calculateMaxPoints(newSelections, targetType);
                maxPoints = Math.max(maxPoints, choicePoints + subsequentPoints);
            } else {
                // Standard choices
                for (const option of choice.options) {
                    if (!isOptionDependencyMet(selections, option.dependsOn, false)) continue;

                    const optionPoints = targetType === "paragon" ? option.paragon || 0 : option.renegade || 0;
                    const newSelections = { ...selections, [choiceId]: option.id };

                    const subsequentPoints = calculateMaxPoints(newSelections, targetType);
                    maxPoints = Math.max(maxPoints, optionPoints + subsequentPoints);
                }

                // Also try skipping if not forced
                if (!choice.isForced) {
                    const skipSelections = { ...selections, [choiceId]: "skip" };
                    const skipPoints = calculateMaxPoints(skipSelections, targetType);
                    maxPoints = Math.max(maxPoints, skipPoints);
                }
            }
        }

        memo.set(key, maxPoints);
        return maxPoints;
    }

    const availableParagon = calculateMaxPoints(selectedChoices, "paragon");
    const availableRenegade = calculateMaxPoints(selectedChoices, "renegade");

    return { availableParagon, availableRenegade };
}

function findChoiceGroups(gameData: SectionData[], choiceMap: Map<string, ChoiceData | NumericChoiceData>): string[][] {
    const visited = new Set<string>();
    const choiceGroups: string[][] = [];
    const adjacencyList = getAdjacentChoices(gameData);

    for (const choiceId of choiceMap.keys()) {
        if (visited.has(choiceId)) continue;

        const stack: string[] = [choiceId];
        const group: string[] = [];

        while (stack.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const currentId = stack.pop()!;

            if (visited.has(currentId)) continue;

            visited.add(currentId);
            group.push(currentId);

            const neighbors = adjacencyList.get(currentId) ?? [];

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }

        choiceGroups.push(group);
    }

    return choiceGroups;
}
