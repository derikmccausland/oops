import React, { useRef, useEffect, useState } from "react";
import ControlsCss from './cssSheets/controls.css'

const Controls = (props) => {
    const [showControls, setShowControls] = useState(true)

    return(
        <div className='controlsPage'>
            <div className='playerPic'>
                <div>Full Pic</div>
                <div>small pic</div>
            </div>
            <div className='instructions'>
                <div className='controlText'>To move, press</div>
                    <div className='allArrows'>
                        <div className='arrows'>
                            <div className='upArrow'>⇧</div>
                            <div className='bottomArrows'>
                            <div className='leftArrow'>⇦</div>
                            <div className='downArrow'>⇩</div>
                            <div className='rightArrow'>⇨</div>
                            </div>
                        </div>
                        
                        <div className='controlsOr'>OR</div>
                        
                        <div className='wasd'>
                            <div className='wasdW'>W</div>
                            <div className='bottomArrows'>
                            <div className='wasdA'>A</div>
                            <div className='wasdS'>S</div>
                            <div className='wasdD'>D</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='controlsMisc'>
                Walk into Enemies to Attack
                <br></br>
                <br></br>
                Walk into Items to add them to your Inventory
                <br></br>
                <br></br>
                Press the given number to Ready one of your Items
                <br></br>
                <br></br>
                Press E to use/equip, or K to Destroy a Readied Item
            </div> */}
            
            <div
                className='controlsButton'
                onClick={() => props.closeControls()}>
                ~Let's Go!~
            </div>
        
        </div>
    )
}
export default Controls