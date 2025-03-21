import Choice from "./Choice";
import { GroupData, OptionDependencyData } from "../types";

interface GroupProps {
    group: GroupData;
    selectedChoices: Record<string, string>;
    handleOptionSelect: (choiceId: string, optionId: string) => void;
    isOptionDependencyMet: (dependsOn?: OptionDependencyData[]) => boolean;
}

export default function Group({ group, selectedChoices, handleOptionSelect, isOptionDependencyMet }: GroupProps) {
    return (
        <div className="my-4 border-l-4 border-gray-300 pt-2 pb-2 pl-4">
            <h3 className="mb-2 font-semibold">{group.title}</h3>

            {group.description && <p className="mb-3 text-gray-600 italic">{group.description}</p>}

            <div className="space-y-2">
                {group.choices.map((choice) => (
                    <Choice
                        key={choice.id}
                        choice={choice}
                        selectedChoices={selectedChoices}
                        handleOptionSelect={handleOptionSelect}
                        isOptionDependencyMet={isOptionDependencyMet}
                    />
                ))}
            </div>
        </div>
    );
}
