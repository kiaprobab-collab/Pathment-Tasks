
const SingleProduct = (props) => {
  return (
    <div style={{width:"500px", height:"350px", display:"flex", border:"1px solid black"}}>
        <img src={props.thumbnail}></img>
        <h5>{props.title}</h5>
    </div>
  )
}

export default SingleProduct