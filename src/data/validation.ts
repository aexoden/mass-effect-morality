import { SectionData } from "../types";

export function validateGameData(data: SectionData[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const sectionIds = new Set<string>();
    const groupIds = new Set<string>();
    const choiceIds = new Set<string>();

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
            });
        });
    });

    // Validate dependency relationships
    const allChoiceIdsSet = new Set([...choiceIds]);

    data.forEach((section) => {
        section.groups.forEach((group) => {
            group.choices.forEach((choice) => {
                // Check that the dependency choiceIds actually exist
                if (choice.dependsOn) {
                    choice.dependsOn.forEach((dep) => {
                        if (!allChoiceIdsSet.has(dep.choiceId)) {
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
                                    if (!allChoiceIdsSet.has(childDep.choiceId)) {
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
