import React from "react";

interface Props {
    score: {
        win: number;
        lose: number;
    };
}

const Score = ({ score }: Props) => {
    return (
        <div className="score flex justify-center gap">
            <div className="flex flex-col items-center">
                <span>WIN</span>
                <span>{score.win}</span>
            </div>

            <div className="flex flex-col items-center">
                <span>LOSE</span>
                <span>{score.lose}</span>
            </div>
        </div>
    );
};

export default Score;
