import React, { Dispatch, SetStateAction, useState } from "react";
import { Champion } from "../types/champions";

interface Props {
    currentChampion: Champion;
    chooseRandomChamp: () => Promise<void>;
    setScore: Dispatch<
        SetStateAction<{
            win: number;
            lose: number;
        }>
    >;
}

const GuessForm = ({ currentChampion, chooseRandomChamp, setScore }: Props) => {
    const [champName, setChampName] = useState("");
    const [lastTry, setLastTry] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setChampName(e.target.value.toLowerCase());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            (e.code === "Enter" && e.shiftKey) ||
            (e.code === "NumpadEnter" && e.shiftKey)
        ) {
            chooseRandomChamp();
            setScore((prev) => ({ ...prev, lose: prev.lose + 1 }));
        } else if (e.code === "Enter" || e.code === "NumpadEnter") {
            const currentChampLowerCase = currentChampion.name.toLowerCase();
            if (currentChampLowerCase == champName) {
                chooseRandomChamp();
                setChampName("");
                setScore((prev) => ({ ...prev, win: prev.win + 1 }));
            } else if (
                champName !== lastTry &&
                currentChampLowerCase !== champName
            ) {
                setScore((prev) => ({ ...prev, lose: prev.lose + 1 }));
                setLastTry(champName);
            }
        }
    };

    return (
        <div className="mt-1">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={champName}
                    onChange={(e) => handleChange(e)}
                    placeholder="Champion Name Here"
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            </form>
            <span className="note">Shift + Enter To Skip</span>
        </div>
    );
};

export default GuessForm;
