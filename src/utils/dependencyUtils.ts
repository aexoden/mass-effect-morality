import {
    ChoiceData,
    ChoiceDependencyData,
    NumericChoiceData,
    OptionData,
    OptionDependencyData,
    SectionData,
} from "../types";

/**
 * Checks if a choice's dependencies are met based on the selected choices.
 */
export function isChoiceDependencyMet(
    selectedChoices: Record<string, string>,
    choiceDependsOn: ChoiceDependencyData[] | undefined,
): boolean {
    if (!choiceDependsOn || choiceDependsOn.length === 0) {
        return true;
    }

    return choiceDependsOn.every((dep) => dep.optionIds.includes(selectedChoices[dep.choiceId]));
}

/**
 * Checks if a choice is explictly locked (a dependency has been chosen that doesn't match the required option).
 */
export function isChoiceExplicitlyLocked(
    selectedChoices: Record<string, string>,
    choiceDependsOn: ChoiceDependencyData[] | undefined,
): boolean {
    if (!choiceDependsOn || choiceDependsOn.length === 0) {
        return false;
    }

    return choiceDependsOn.some((dep) => {
        if (dep.choiceId in selectedChoices) {
            return !dep.optionIds.includes(selectedChoices[dep.choiceId]);
        }

        return false;
    });
}

/**
 * Checks if an option's dependencies are met based on selected choices and talent requirements.
 */
export function isOptionDependencyMet(
    selectedChoices: Record<string, string>,
    dependsOn: OptionDependencyData[] | undefined,
    explicitOnly: boolean,
): boolean {
    // If there are no dependencies, they are implicitly met.
    if (!dependsOn || dependsOn.length === 0) {
        return true;
    }

    // Each option can provide a list of dependencies to meet. Only one needs to be satisfied. (This behavior is
    // different from the choice dependencies, which all must be met.) Currently, no attempt is made to check talent
    // requirements, and they are assumed to be met.
    return dependsOn.some((dep) => {
        if (explicitOnly) {
            return !isChoiceExplicitlyLocked(selectedChoices, dep.dependsOn);
        } else {
            return isChoiceDependencyMet(selectedChoices, dep.dependsOn);
        }
    });
}

/**
 * Flattens dependencies in the game data to make deep dependencies explicit.
 */
export function flattenDependencies(gameData: SectionData[]): SectionData[] {
    // Create a clone to avoid mutating the original data.
    const clonedData = JSON.parse(JSON.stringify(gameData)) as SectionData[];

    // Create a lookup map for easy access to choices and their options.
    const choiceMap = new Map<string, ChoiceData | NumericChoiceData>();
    const optionMap = new Map<string, Map<string, OptionData>>();

    // First pass: Create the maps.
    for (const section of clonedData) {
        for (const group of section.groups) {
            for (const choice of group.choices) {
                choiceMap.set(choice.id, choice);

                if (!("type" in choice) || choice.type !== "numeric") {
                    const optionsForChoice = new Map<string, OptionData>();

                    for (const option of choice.options) {
                        optionsForChoice.set(option.id, option);
                    }

                    optionMap.set(choice.id, optionsForChoice);
                }
            }
        }
    }

    // Second pass: Resolve and flatten dependencies.
    for (const section of clonedData) {
        for (const group of section.groups) {
            for (const choice of group.choices) {
                // Flatten choice dependencies.
                if (choice.dependsOn) {
                    choice.dependsOn = resolveTransitiveDependencies(choice.dependsOn, choiceMap, new Set<string>());
                }

                // Flatten option dependencies.
                if (!("type" in choice) || choice.type !== "numeric") {
                    for (const option of choice.options) {
                        if (option.dependsOn) {
                            const flattenedOptionDeps: OptionDependencyData[] = [];

                            for (const dep of option.dependsOn) {
                                // If this dependency has nested dependencies
                                if (dep.dependsOn) {
                                    // Get the flattened choice dependencies
                                    const flattenedChoiceDeps = resolveTransitiveDependencies(
                                        dep.dependsOn,
                                        choiceMap,
                                        new Set<string>(),
                                    );

                                    // Create a new option dependency with the flattened choice dependencies.
                                    flattenedOptionDeps.push({
                                        ...dep,
                                        dependsOn: flattenedChoiceDeps,
                                    });
                                } else {
                                    flattenedOptionDeps.push(dep);
                                }
                            }

                            option.dependsOn = flattenedOptionDeps;
                        }
                    }
                }
            }
        }
    }

    return clonedData;
}

function resolveTransitiveDependencies(
    dependencies: ChoiceDependencyData[],
    choiceMap: Map<string, ChoiceData | NumericChoiceData>,
    visitedChoices: Set<string>,
): ChoiceDependencyData[] {
    const result: ChoiceDependencyData[] = [...dependencies];

    // Find all transitive dependencies.
    for (const dep of dependencies) {
        // Skip to avoid circular dependencies.
        if (visitedChoices.has(dep.choiceId)) {
            continue;
        }

        const choice = choiceMap.get(dep.choiceId);

        // Skip if there are no dependencies for this choice.
        if (!choice?.dependsOn) {
            continue;
        }

        // Add this choice to visited.
        const newVisited = new Set(visitedChoices);
        newVisited.add(dep.choiceId);

        // Recursively resolve dependencies of this dependency.
        const transitiveDeps = resolveTransitiveDependencies(choice.dependsOn, choiceMap, newVisited);

        // Add all transitive dependencies to the result.
        for (const transitiveDep of transitiveDeps) {
            let existing = false;

            // Check if we already have this dependency in our result.
            for (const resultDep of result) {
                if (resultDep.choiceId === transitiveDep.choiceId) {
                    // This possibility should probably never happen, but we may as well handle it. Since we have to
                    // make sure that both the original and transitive dependencies are met, the allowed options must
                    // be the intersection of the two sets. If the resulting set is empty, log a data error.
                    const intersection = [...resultDep.optionIds].filter((x) => transitiveDep.optionIds.includes(x));

                    if (intersection.length === 0) {
                        throw new Error(
                            `Dependency for choice ${dep.choiceId} has no allowed options after resolving transitive dependencies.`,
                        );
                    }

                    resultDep.optionIds = intersection;
                    existing = true;
                    break;
                }
            }

            // If this is a new dependency, add it.
            if (!existing) {
                result.push({ ...transitiveDep });
            }
        }
    }

    return result;
}
