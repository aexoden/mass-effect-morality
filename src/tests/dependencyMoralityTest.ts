import gameChoicesData from "../data/gameChoices";
import { combinedTests, overallTotals } from "../data/testDefinitions";
import { CombinedTest, SectionData } from "../types";

import { calculateAvailablePoints } from "../utils/moralityCalculator";

interface TestResult {
    passed: boolean;
    expected: [number, number];
    actual: [number, number];
}

export interface TestSuiteResults {
    individualTests: {
        passed: Record<string, TestResult>;
        failed: Record<string, TestResult>;
    };

    combinedTests: {
        passed: Record<string, TestResult>;
        failed: Record<string, TestResult>;
    };

    overallTest: TestResult;
}

function calculateSectionPoints(section: SectionData): { availableParagon: number; availableRenegade: number } {
    const sectionData = [section];
    return calculateAvailablePoints(sectionData, {});
}

function calculateCombinedSectionPoints(test: CombinedTest): { availableParagon: number; availableRenegade: number } {
    const sections = gameChoicesData.filter((section) => test.sectionIds.includes(section.id));
    return calculateAvailablePoints(sections, {});
}

function calculateTotalPoints(): { availableParagon: number; availableRenegade: number } {
    return calculateAvailablePoints(gameChoicesData, {});
}

function testIndividualSections(results: TestSuiteResults): void {
    gameChoicesData.forEach((section) => {
        const expectedPoints = section.expectedPoints;

        if (!expectedPoints) {
            return;
        }

        const { availableParagon, availableRenegade } = calculateSectionPoints(section);

        const result: TestResult = {
            actual: [availableParagon, availableRenegade],
            expected: [expectedPoints.paragon, expectedPoints.renegade],
            passed: availableParagon === expectedPoints.paragon && availableRenegade === expectedPoints.renegade,
        };

        if (result.passed) {
            results.individualTests.passed[section.id] = result;
        } else {
            results.individualTests.failed[section.id] = result;
        }
    });
}

function testCombinedSections(results: TestSuiteResults): void {
    combinedTests.forEach((test) => {
        const { availableParagon, availableRenegade } = calculateCombinedSectionPoints(test);

        const result: TestResult = {
            actual: [availableParagon, availableRenegade],
            expected: [test.expectedPoints.paragon, test.expectedPoints.renegade],
            passed:
                availableParagon === test.expectedPoints.paragon && availableRenegade === test.expectedPoints.renegade,
        };

        if (result.passed) {
            results.combinedTests.passed[test.name] = result;
        } else {
            results.combinedTests.failed[test.name] = result;
        }
    });
}

function testOverallTotals(results: TestSuiteResults): void {
    const { availableParagon, availableRenegade } = calculateTotalPoints();

    const expectedParagon = overallTotals.withDLC.paragon;
    const expectedRenegade = overallTotals.withDLC.renegade;

    results.overallTest = {
        actual: [availableParagon, availableRenegade],
        expected: [expectedParagon, expectedRenegade],
        passed: availableParagon === expectedParagon && availableRenegade === expectedRenegade,
    };
}

export function runDependencyMoralityTests(): TestSuiteResults {
    const results: TestSuiteResults = {
        combinedTests: {
            failed: {},
            passed: {},
        },
        individualTests: {
            failed: {},
            passed: {},
        },
        overallTest: {
            actual: [0, 0],
            expected: [0, 0],
            passed: false,
        },
    };

    testIndividualSections(results);
    testCombinedSections(results);
    testOverallTotals(results);

    return results;
}
