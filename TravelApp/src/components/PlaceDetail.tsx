import { useParams, Link } from "react-router-dom";
import { places } from "../assets/places";
import { IoLocationOutline, IoStar,} from "react-icons/io5";
import Buttons from "./Buttons";

const PlaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const placeId = Number(id);
  const place = places.find((p) => p.id === placeId);


  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px", fontFamily: "Alata", color: "white" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B2BEB5", textDecoration: "none", marginBottom: "24px" }}>
        <span> Back to Offerings</span>
      </Link>

      <div style={{ display: "flex", flexDirection: "row", gap: "40px", flexWrap: "wrap" }}>

        <div style={{ flex: "1 1 500px", borderRadius: "16px", overflow: "hidden", maxHeight: "500px" }}>
          <img
            src={place?.imgLink}
            alt={place?.title}
            style={{ width: "100%", height: "100%", objectPosition: "top", objectFit: "cover", display: "block" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                {place?.country}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#FFD700" }}>
                <IoStar size={14} />
                <span style={{ fontSize: "14px", color: "white" }}>{place?.rating}</span>
              </div>
            </div>

            <h1 style={{ fontSize: "40px", fontFamily: "Outfit", margin: "0 0 16px 0", fontWeight: "normal" }}>
              {place?.title}
            </h1>

            <p style={{ display: "flex", alignItems: "center", gap: "6px", color: "#B2BEB5", margin: "0 0 24px 0" }}>
              <IoLocationOutline size={16} />
              <span>{place?.location}</span>
            </p>

            <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#E4E4E7", margin: "0 0 32px 0" }}>
              {place?.description}
            </p>

            <div style={{ display: "flex", gap: "24px", marginBottom: "32px"}}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#71717A" }}>Duration</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>{place?.days}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      
                <div>
                  <div style={{ fontSize: "12px", color: "#71717A" }}>Best Time to Visit</div>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>{place?.bestTimeToVisit}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderRadius: "12px", border: "1px solid #27272A" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#71717A" }}>Price per person</div>
              <div style={{ fontSize: "28px", fontWeight: "bold", fontFamily: "Outfit" }}>${place?.price}</div>
              <div style={{ fontSize: "12px", color: "#B2BEB5" }}>{place?.reviewsNumbers}+ reviews</div>
            </div>
            <Buttons variant="outline">Book</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
