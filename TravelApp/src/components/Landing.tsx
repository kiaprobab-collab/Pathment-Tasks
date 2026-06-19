import Buttons from "./Buttons"


const Landing = () => {
  return (
    <div style={{position:"relative", width:"100%"}}>
        <img style={{width:"100%",display:"block"}} src="https://media.architecturaldigest.com/photos/6568c0dfd79a773a58ee8766/16:9/w_1920,c_limit/Whitaker%20Studio_Joshua%20Tree%20Residence_12.jpg"></img>
        <h1 style={{position:"absolute", top:"10%", left:"50%",transform: "translate(-50%, -50%)", color:"white", textAlign:"center",fontSize:"4rem", fontFamily:"Outfit", textShadow: "2px 2px 10px rgba(0,0,0,0.5)"}}>Enter the world of visify</h1>
    </div>
)
}

export default Landing