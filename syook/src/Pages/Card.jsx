export const Card = ({ item }) => {

  return (
    <div>
      <div className="imageDiv">
        <img src={item.image} />
      </div>
      <div className="contentDiv">
        <div className="dishName">
        <p id="dish">DishName:</p><p>{`${item.dishName}`}</p>
        </div>
        <div className="dishDescription">
        <p>{`  ${item.description}`}</p>
        </div>
      </div>





    </div>
  )
}