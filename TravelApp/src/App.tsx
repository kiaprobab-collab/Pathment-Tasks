
import PlacesCard from './components/PlacesCard'
import {places} from './assets/places.js'
import NavBar from './components/NavBar'
import Landing from './components/Landing.js'
import Footer from './components/Footer.js'

function getPlacesCurrentId(id){
    console.log(id)
    // <PlacesItem />
}

const App = () => {
  return ( <div style={{width:"100%", height:"100%", backgroundColor:"#0F0F12"}}>
    <NavBar />
    
   <Landing />
   <h2 style={{color:"white", fontFamily:"Alata", textAlign:"center", marginTop:"10px", fontSize:"1.2rem", fontWeight:"normal"}}>Summer Offerings</h2>4
   <hr style={{border:"none", height:"1px", backgroundColor:"white"}}/>
    <div style={{marginTop:"20px",display:"flex" ,flexWrap:"wrap", justifyContent:"center"}}>
    {
     places.map((place) => (
      <PlacesCard 
        key={place.id}
        title={place.title}
        imgLink={place.imgLink}
        location={place.location}
        price={place.price}
        reviewsNumber={place.reviewsNumbers}
        getPlacesCurrentId={() => getPlacesCurrentId(place.id)}
        />
     ) 
    )
  }
  <Footer />
  </div>
  </div>
  )
}

export default App