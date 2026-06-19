import Buttons from "./Buttons";

const Footer = () => {
  return (
    <div style={{width: "100%",backgroundColor: "white",marginTop: "80px",borderTopLeftRadius: "40px",borderTopRightRadius: "40px",fontFamily: "Alata",padding: "80px 20px",boxSizing: "border-box"}}>
      <div style={{maxWidth: "700px",margin: "0 auto",textAlign: "center",}}>
        <h1 style={{marginBottom: "16px",fontSize: "42px",color: "#09090B"}}>
          Stay Connected
        </h1>

        <p style={{color: "#71717A",fontSize: "18px",lineHeight: "1.7",marginBottom: "40px"}}>
          Stay in touch with us for updates, exclusive travel deals,
          destination guides, and valuable insights for your next adventure.
        </p>

        <div style={{display: "flex",gap: "12px",justifyContent: "center",flexWrap: "wrap"}}>
          
          <input type="email" placeholder="Enter your email"
            style={{
              width: "400px",
              maxWidth: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #E4E4E7",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <Buttons children={"Subscribe"}/>
        </div>

        <div style={{
            marginTop: "60px",borderTop: "1px solid #E4E4E7",paddingTop: "20px",color: "#71717A",fontSize: "14px"}}>
          © 2026 Visify. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;