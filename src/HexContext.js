// import { createContext } from "react";

// export const HexContext = createContext()

// export const HexProvider = (props) => {


// World.js | Player.js | Monster.js | Stairs.js
    const normal = "#FFFFFF"
    const warning = "#D18C8C"
    const consumable = "#48FF47"
    const story = "#CACACA"
    const info = "#7F96FF"
    const inspect = "#00A5D8"
    const monsterDeath = "#00D966"
    const monsterAttack = "#FF917C"
    const playerAttack = "#F6BF00"
    const critical = "#F6D900"
    const curse = "#CF0000"


//   return (
//       <HexContext.Provider value={{
//           warning,
//           consumable,
//           story,
//           equip,
//           inspect,
//           pickup
//       }}>
//           {props.children}
//       </HexContext.Provider>
//   )
// }

// export default HexContext

// add this to the top of your class component
    // static contextType = HexContext

// add this to your function within the class component
    // const {...hex} = this.context