import Buttons from "./Buttons"
import { Link } from "react-router-dom"


const NavBar = () => {
  return (
    <div style={{ borderBottom: "1px solid white", position: "sticky", top: 0, zIndex: 1000, fontFamily: "Alata", display: "flex", color: "white", width: "100%", backgroundColor: "#09090B", justifyContent: "space-between", alignItems: "center", padding: "10px 32px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={{ fontSize: "1.6rem" }}>Visify</h2>
      </Link>
      <div style={{ display: "flex", gap: "20px" }}>
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