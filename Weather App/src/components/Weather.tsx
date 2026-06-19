import { useEffect, useState } from 'react';

export const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function getWeather(city) {
    if (!city){
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e&units=metric`
      );
      const data = await res.json();
      if (data) {
        setWeatherData(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeather("bangalore");
  }, []);



return (
  <div style={{minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",background: "#f4f4f5",fontFamily: "Arial"}}>
    <div style={{width: "400px",background: "#fff",padding: "24px",borderRadius: "16px",boxShadow: "0 4px 20px rgba(0,0,0,0.1)"}}>
      <h2 style={{textAlign: "center",marginBottom: "20px",color: "black"}}>
        Weather App
      </h2>

      <div style={{display: "flex",gap: "10px",marginBottom: "20px"}}>
        <input type="text" placeholder="Search city..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #000000",
            borderRadius: "8px",
          }}
        />

        <button onClick={() => getWeather(search)} disabled={loading}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#a305fb",
            color: "white",
            cursor: "pointer"
          }}
        > Search </button>
      </div>


      {weatherData && !loading && (
        <>
        <div style={{textAlign: "center",padding: "16px",background: "#ede5fe",borderRadius: "12px"}}>
          <h3 style={{ marginBottom: "10px" }}>{weatherData.name}</h3>

          <h1 style={{margin: "10px 0",fontSize: "3rem",color: "#a305fb"}}>
            {Math.round(weatherData.main?.temp)}°C
          </h1>

          <p style={{color: "#52525b",}}>
            {weatherData.weather?.[0]?.description} ~ Feels Like: {weatherData.main?.feels_like}
          </p>
        </div>
       
        <div style={{marginTop:"10px",textAlign: "center",padding: "16px",background: "#ede5fe",borderRadius: "12px"}}>
          <h3 style={{ marginBottom: "10px" }}>Humidity</h3>
          <h1 style={{margin: "10px 0",fontSize: "3rem",color: "#a305fb"}}>
            {(weatherData.main?.humidity)}
          </h1>
        </div>
        
        <div style={{marginTop:"10px",textAlign: "center",padding: "16px",background: "#ede5fe",borderRadius: "12px"}}>
          <h3 style={{ marginBottom: "10px" }}>Wind Speed</h3>
          <h1 style={{margin: "10px 0",fontSize: "3rem",color: "#a305fb"}}>
            {(weatherData.wind?.speed)}
          </h1>
        </div>
        </>
        
      )}
    </div>
  </div>
);
};
