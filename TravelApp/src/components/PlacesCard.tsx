import { IoLocationOutline } from "react-icons/io5";

const PlacesCard = (props: any) => {
    return (
    <div onClick={props.getPlacesCurrentId} style={{ display:"flex", flexDirection:"column",width: "250px", height:"300px",fontFamily: "Alata" , borderRadius:"12px", margin:"20px 32px", backgroundColor:"#09090B"}}>
        <img src={props.imgLink} style={{objectFit:"cover",objectPosition:"center top",width:"100%", height: "50%", borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}></img>
        <div style={{display:"flex",flexDirection:"column", justifyContent:"end", margin:0, padding:"10px"}}>
        <h3 style={{paddingLeft:"10px", color:"white"}}>{props.title}</h3>
        <p style={{ display: "flex",alignItems: "center",paddingLeft:"10px" , fontSize:"10px", color:"#B2BEB5"}}><IoLocationOutline size={"8.5px"}/> {props.location}</p>
        <div style={{display:"flex" ,marginTop: "auto", justifyContent:"space-between",alignItems:"center",padding:"10px", alignItems:"center", marginTop:"20px"}}>
            <h2 style={{padding:"", color:"white", fontSize:"20px"}}>${props.price}</h2>
            <h4 style={{padding:"", color:"#B2BEB5", fontSize:"10px"}}>{props.reviewsNumbers}+ reviews</h4>
        </div>
        </div>
    </div>
  )
}

export default PlacesCard