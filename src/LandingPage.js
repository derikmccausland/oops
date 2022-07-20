import React, { useEffect, useState } from "react";
import Controls from './Controls'
import LP from './cssSheets/LP.css'
import Paladin from './assets/uf_heroes/paladin_1.png'


const LandingPage = (props) => {

    const [startTitle, setStartTitle] = useState(false)
    const [showControls, setShowControls] = useState(false)

    useEffect(() => {
        console.log(props)
    }, [])

    const toggleControls = () =>{
        setShowControls(true)
      }
      
    return(
        <div className='landingPage'>
            <div className='landingHeader1'>
                {!startTitle && <h1 className='landingHeader11'>
                    WELCOME
                </h1>}
                {!startTitle && <h1 className='landingHeader11'>
                    TO
                </h1>}
            </div>
            <div style={{display:'flex', justifyContent:'space-around', gap:'5vw'}}>
                {!startTitle && <h1 className='landingHeader2'>
                    HYPOGEAN
                </h1>}
                {!startTitle && <h1 className='landingHeader2'>
                    DOMINION
                </h1>}

            </div>
            {!startTitle && <div 
                className='startButton'
                onClick={() => {setStartTitle(true)}}
                >~ Begin Quest ~
            </div>}

            {startTitle && !showControls &&
            <div className='startingPage'>
                {startTitle && <div className='spHeader'></div>}
                {startTitle && <div className='startingScript'>
                    <p className='introScript'>Somehow, Palpatine is still alive. 
                        <br></br>
                        <br></br>
                        <br></br>
                        But this game has nothing to do with it. 
                        <br></br>
                        <br></br>
                        <br></br>
                        Stuarth, the dark king, has grown powerful in his dark underground kingdom. 
                        <br></br>
                        <br></br>
                        <br></br>
                        Many adventurers have attempted to end his reign of terror, and many have failed. 
                        <br></br>
                        <br></br>
                        <br></br>
                        Fight through three exciting levels, gather equipment, and prepare to face the king under the mountain in his...                                
                        <br></br>
                        <br></br>
                        <br></br>
                        <h1 style={{fontSize:'2.5vw', marginTop:'-1vw', marginBottom:'0vw'}}>HYPOGEAN DOMINION</h1>
                    </p>
                    
                    <section
                        className='beginButton'
                        onClick={() => {toggleControls()}}
                        >~ Controls ~
                    </section>
                </div>}

                {startTitle && <div className='spHeader'></div>}
            </div>}
        
            {showControls &&
                <div className='controlsPage'>
                    <div className='controls'>Controls</div>

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
                <div className='controlsMisc'>
                    Walk into Enemies to Attack
                    <br></br>
                    Walk into Items to add them to your Inventory
                    <br></br>
                    Press the given number to Ready one of your Items
                    <br></br>
                    Press E to use/equip, or G to Destroy a Readied Item
                    <br></br>
                    Pres SPACE to wait for one turn
                </div>
                
                <div
                    className='controlsButton'
                    onClick={() => props.startGame()}>
                    ~ Enter Dungeon ~
                </div>
            
            </div>}
        </div>
    )
}

export default LandingPage


