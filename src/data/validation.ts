import { SectionData } from "../types";

export function validateGameData(data: SectionData[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const sectionIds = new Set<string>();
    const groupIds = new Set<string>();
    const choiceIds = new Set<string>();
    const allChoices = new Map<string, Set<string>>();

    // Check for duplicate IDs
    data.forEach((section) => {
        if (sectionIds.has(section.id)) {
            errors.push(`Duplicate section ID: ${section.id}`);
        } else {
            sectionIds.add(section.id);
        }

        section.groups.forEach((group) => {
            if (groupIds.has(group.id)) {
                errors.push(`Duplicate group ID: ${group.id}`);
            } else {
                groupIds.add(group.id);
            }

            group.choices.forEach((choice) => {
                if (choiceIds.has(choice.id)) {
                    errors.push(`Duplicate choice ID: ${choice.id}`);
                } else {
                    choiceIds.add(choice.id);
                }

                allChoices.set(choice.id, new Set<string>());

                // Option IDs don't need to be globally unique, but they do need to be unique within a choice.
                const optionIds = new Set<string>();

                choice.options.forEach((option) => {
                    if (optionIds.has(option.id)) {
                        errors.push(`Duplicate option ID ${option.id} in choice ${choice.id}`);
                    } else {
                        optionIds.add(option.id);
                    }

                    allChoices.get(choice.id)?.add(option.id);
                });
            });
        });
    });

    // Validate dependency relationships
    data.forEach((section) => {
        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                // Check that the dependency choiceIds actually exist
                if (choice.dependsOn) {
                    choice.dependsOn.forEach((dep) => {
                        if (allChoices.has(dep.choiceId)) {
                            if (dep.optionId !== "skip" && !allChoices.get(dep.choiceId)?.has(dep.optionId)) {
                                errors.push(
                                    `Choice ${choice.id} depends on non-existent option ${dep.optionId} in choice ${dep.choiceId}`,
                                );
                            }
                        } else {
                            errors.push(`Choice ${choice.id} depends on non-existent choice ${dep.choiceId}`);
                        }
                    });
                }

                // Check option dependencies as well
                choice.options.forEach((option) => {
                    if (option.dependsOn) {
                        option.dependsOn.forEach((dep) => {
                            if (dep.dependsOn) {
                                dep.dependsOn.forEach((childDep) => {
                                    if (allChoices.has(childDep.choiceId)) {
                                        if (
                                            childDep.optionId !== "skip" &&
                                            !allChoices.get(childDep.choiceId)?.has(childDep.optionId)
                                        ) {
                                            errors.push(
                                                `Option ${option.id} depends on non-existent option ${childDep.optionId} in choice ${childDep.choiceId}`,
                                            );
                                        }
                                    } else {
                                        errors.push(
                                            `Option ${option.id} depends on non-existent choice ${childDep.choiceId}`,
                                        );
                                    }
                                });
                            }
                        });
                    }
                });
            });
        });
    });

    // Check for circular dependencies
    const dependencyGraph = new Map<string, string[]>();

    data.forEach((section) => {
        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                const dependencies: string[] = [];

                if (choice.dependsOn) {
                    choice.dependsOn.forEach((dep) => {
                        dependencies.push(dep.choiceId);
                    });
                }

                choice.options.forEach((option) => {
                    if (option.dependsOn) {
                        option.dependsOn.forEach((dep) => {
                            if (dep.dependsOn) {
                                dep.dependsOn.forEach((childDep) => {
                                    dependencies.push(childDep.choiceId);
                                });
                            }
                        });
                    }
                });

                dependencyGraph.set(choice.id, dependencies);
            });
        });
    });

    // Simple cycle detection
    dependencyGraph.forEach((dependencies, choiceId) => {
        dependencies.forEach((depId) => {
            const depDependencies = dependencyGraph.get(depId) ?? [];
            if (depDependencies.includes(choiceId)) {
                errors.push(`Circular dependency detected between choices ${choiceId} and ${depId}`);
            }
        });
    });

    return { errors, valid: errors.length === 0 };
}
