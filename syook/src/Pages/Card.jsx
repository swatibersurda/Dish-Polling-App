export const Card = ({ item }) => {
  
  return (
    <div id="child">
      <div id="imageDiv">
        <img src={item.image}/>
    
     </div>
     <div>
     <h5>{`Dish Name:  ${item.dishName}`}</h5>
     </div>
     <div>
     <h5>{`Description:  ${item.description}`}</h5>
     </div>

   

      
    </div>
  )
}