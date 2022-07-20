import { useEffect, useRef } from "react";

function InspectSprite(props) {
    const {item, atlas} = props
    const canvasRef = useRef(null);

    const drawItem = (ctx, x, y) => {
        ctx.clearRect(0, 0, 96, 96)
        ctx.drawImage(atlas, x, y, 48, 48, 0, 0, 96, 96)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if(canvas) {
            const context = canvas.getContext("2d");
            console.log(context)
            drawItem(context, item.spriteSheetCoordinates.x, item.spriteSheetCoordinates.y)
        }
    }, [item])

    return (
        <canvas ref={canvasRef} width="96" height="96"></canvas>
    )

}

export default InspectSprite