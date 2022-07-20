import { useEffect, useRef } from "react";

function InventorySprite(props) {
    const {item, atlas} = props
    const canvasRef = useRef(null);

    const drawItem = (ctx, x, y) => {
        ctx.clearRect(0, 0, 40, 40)
        ctx.drawImage(atlas, x, y, 48, 48, 0, 0, 40, 40)
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
        <canvas ref={canvasRef} width="40" height="40"></canvas>
    )

}

export default InventorySprite