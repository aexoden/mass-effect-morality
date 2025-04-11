/* eslint-disable sort-keys */
import { CombinedTest } from "../types";

export const combinedTests: CombinedTest[] = [
    {
        name: "Prologue",
        sectionIds: ["history-and-profile", "prologue"],
        expectedPoints: { paragon: 42, renegade: 49 },
    },
    {
        name: "Noveria",
        sectionIds: ["noveria-geth-interest", "noveria-lorik-quiin", "noveria-matriarch-benezia"],
        // TODO: I'm not sure what's going on here. The wiki says the totals are 112/107. By my count, if I include the
        // "after 2 plot worlds" conversation, the count is 112/109. If I don't, it's 110/107. Either way, I can't get
        // a match. This may require in-game investigation.
        expectedPoints: { paragon: 112, renegade: 107 },
    },
    {
        name: "Feros",
        sectionIds: ["feros-geth-attack", "feros-the-thorian"],
        expectedPoints: { paragon: 116, renegade: 86 },
    },
    {
        name: "Virmire",
        sectionIds: ["virmire-wrex", "virmire-assisting-kirrahe", "virmire-assault"],
        // TODO: This is another one that doesn't match up as far as I can tell. The only questionable choice seems to
        // be if you can get the 2 Renegade points for saying "Dump him." if you kill Wrex (rather than Ashley). None of
        // the other 2 point options seem even debatable. By my count, the total should be 66/64.
        expectedPoints: { paragon: 66, renegade: 62 },
    },
];

export const overallTotals = {
    withoutDLC: { paragon: 593, renegade: 571 },
    withDLC: { paragon: 629, renegade: 609 },
};
