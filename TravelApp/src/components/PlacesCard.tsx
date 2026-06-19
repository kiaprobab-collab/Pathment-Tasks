import { IoLocationOutline } from "react-icons/io5";

interface PlacesCardProps {
  title: string;
  imgLink: string;
  location: string;
  price: number;
  reviewsNumber: number;
  getPlacesCurrentId: () => void;
}

const PlacesCard = ({
  title,
  imgLink,
  location,
  price,
  reviewsNumber,
  getPlacesCurrentId,
}: PlacesCardProps) => {
  return (
    <div
      onClick={getPlacesCurrentId}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        height: "300px",
        fontFamily: "Alata",
        borderRadius: "12px",
        margin: "20px 32px",
        backgroundColor: "#09090B",
        cursor: "pointer",
      }}
    >
      <img
        src={imgLink}
        alt={title}
        style={{
          objectFit: "cover",
          objectPosition: "center top",
          width: "100%",
          height: "50%",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "end", margin: 0, padding: "10px" }}>
        <h3 style={{ paddingLeft: "10px", color: "white" }}>{title}</h3>
        <p style={{ display: "flex", alignItems: "center", paddingLeft: "10px", fontSize: "10px", color: "#B2BEB5" }}>
          <IoLocationOutline size={"8.5px"} /> {location}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", marginTop: "20px" }}>
          <h2 style={{ padding: "", color: "white", fontSize: "20px" }}>${price}</h2>
          <h4 style={{ padding: "", color: "#B2BEB5", fontSize: "10px" }}>{reviewsNumber}+ reviews</h4>
        </div>
      </div>
    </div>
  );
};

export default PlacesCard;