import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import GuessForm from "../components/GuessForm";
import Score from "../components/Score";
import { Champion } from "../types/champions";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { pixelateImage } from "../utils/pixelateImage";

const Home: NextPage = () => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [currentChamp, setCurrentChamp] = useState<Champion>();
    const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
    const [score, setScore] = useState({ win: 0, lose: 0 });

    const chooseRandomChamp = async (champs: Champion[]) => {
        if (!champs) return;
        const randomChamp = generateRandomNumber(0, champs.length - 1);
        setCurrentChamp(champs[randomChamp]);
        setChampions((prev) => prev?.filter((c) => c != champs[randomChamp]));
    };

    useEffect(() => {
        fetch("/api/getChamps")
            .then((data) => data.json())
            .then((data) => Object.values(data))
            .then((data) => {
                setChampions(data as Champion[]);
            });
    }, []);

    useEffect(() => {
        if (currentChamp) {
            const imgURL = currentChamp.imagesURLs[0];
            const tempImage = new Image();
            tempImage.crossOrigin = "Anonymous";
            tempImage.src = imgURL;

            tempImage.onload = () => {
                pixelateImage(tempImage, 11, canvasRef.current);
            };

            tempImage.onerror = () => {
                console.log("currentChamp ERROR");
                chooseRandomChamp(champions);
            };
        }
    }, [champions, canvasRef, currentChamp]);

    return (
        <div className="wraper flex flex-col justify-center items-center">
            <h1>Guess How The Champ</h1>
            {currentChamp && (
                <div className="canvas-wraper">
                    <canvas ref={canvasRef} />
                    <Score score={score} />
                </div>
            )}
            <div>
                {!currentChamp && (
                    <button
                        className="btn mx-auto block"
                        onClick={() => chooseRandomChamp(champions)}
                    >
                        Start {champions.length}
                    </button>
                )}

                {currentChamp && (
                    <GuessForm
                        currentChampion={currentChamp}
                        chooseRandomChamp={() => chooseRandomChamp(champions)}
                        setScore={setScore}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
