

export const CenterComponent = (props: any) => {
  return (
    <div style={{ alignItems:"center",justifyContent: "center"}}>
        {props.children}
    </div>
  )
}
