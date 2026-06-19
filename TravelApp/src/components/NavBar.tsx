import Buttons from "./Buttons"


const NavBar = () => {
  return (
    <div style={{borderBottom:"1px solid white", position:"sticky",top:0, zIndex:1000,fontFamily:"Alata", display:"flex", color:"white", width:"100%", backgroundColor:"#09090B", justifyContent:"space-between",alignItems:"center", padding: "10px 32px"}}>
        <h2>Visify</h2>
        <div style={{display:"flex", gap:"20px"}}> 
            <p>HOME</p>
            <p>PLACES</p>
            <p>HELP</p>
        </div>
        <div>
            <Buttons variant="outline" children="Visit" />
        </div>

    </div>
  )
}

export default NavBar