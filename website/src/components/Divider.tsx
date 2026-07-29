interface Props{
    height: number
    color?: string
}

export default function Divider({height, color}:Props){
    return(
        <div 
            style={
                color ? 
                {
                    width: "100%",
                    height: height,
                    backgroundColor: color
                } 
                : 
                {
                    width: "100%",
                    height: height
                }
            }
        >
        </div>
    )
}