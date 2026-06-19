import Landing from './Landing'
import PlacesCard from './PlacesCard'
import { places } from '../assets/places'
import { Link } from 'react-router-dom'

const getPlacesCurrentId = (id: number) => {
    console.log(id)
}

const Home = () => {
  return (
    <div>
      <Landing />
      <h2 style={{color:"white", fontFamily:"Alata", textAlign:"center", marginTop:"40px", fontSize:"1.8rem", fontWeight:"normal"}}>Summer Offerings</h2>
      <hr style={{border:"none", height:"1px", backgroundColor:"#27272A", width:"80%", margin:"20px auto"}}/>
      <div style={{marginTop:"20px", display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
        {places.map((place) => (
          <Link to={`/places/${place.id}`} key={place.id} style={{ textDecoration: 'none' }}>
            <PlacesCard
              title={place.title}
              imgLink={place.imgLink}
              location={place.location}
              price={place.price}
              reviewsNumber={place.reviewsNumbers}
              getPlacesCurrentId={() => getPlacesCurrentId(place.id)}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
