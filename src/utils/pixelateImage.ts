import { MutableRefObject } from "react";

export function pixelateImage(
    originalImage: HTMLImageElement,
    pixelationFactor: number,
    canvas: HTMLCanvasElement
) {
    const context = canvas.getContext("2d");

    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;

    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (!context) return;

    context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);

    const originalImageData = context.getImageData(
        0,
        0,
        originalWidth,
        originalHeight
    ).data;

    if (pixelationFactor !== 0) {
        for (let y = 0; y < originalHeight; y += pixelationFactor) {
            for (let x = 0; x < originalWidth; x += pixelationFactor) {
                // extracting the position of the sample pixel
                const pixelIndexPosition = (x + y * originalWidth) * 4;
                // drawing a square replacing the current pixels
                context.fillStyle = `rgba(
          ${originalImageData[pixelIndexPosition]},
          ${originalImageData[pixelIndexPosition + 1]},
          ${originalImageData[pixelIndexPosition + 2]},
          1
        )`;
                context.fillRect(x, y, pixelationFactor, pixelationFactor);
            }
        }
    }
}
