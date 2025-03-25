import { useGlobalContext } from "../hooks/useGlobalContext";

function Product({ d }) {
  const { dispatch, cart } = useGlobalContext();
  const { id, image, category, name, price } = d;
  const alreadyAdded = cart.find((d) => d.id === id);
  return (
    <div className="desserts-card">
      <picture>
        <source media="(min-width:998px )" srcSet={image.desktop} />
        <source media="(min-width:800px )" srcSet={image.tablet} />
        <source media="(min-width:400px )" srcSet={image.mobile} />

        <img className="desserts-card-image" src={image.thumbnail} alt="" />
      </picture>
      <div className="buttons-wrapper">
        {!alreadyAdded && (
          <button
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: { ...d, amount: 1 },
              })
            }
            className="btn add-to-card-btn"
          >
            <span className="add-to-card-btn-wrapper">
              <img src="../images/icon-add-to-cart.svg" alt="" />
              <span>Add to Cart</span>
            </span>
          </button>
        )}
        {alreadyAdded && (
          <>
            <button className=" amount-wrapper">
              <button
                onClick={() => {
                  if (alreadyAdded.amount == 1) {
                    dispatch({ type: "DELETE", payload: d.id });
                  } else {
                    dispatch({ type: "DECREMENT", payload: d.id });
                  }
                }}
                className="decrement"
              >
                -
              </button>
              <h2 className="amount-title">{alreadyAdded.amount}</h2>
              <button
                onClick={() => dispatch({ type: "INCREMENT", payload: d.id })}
                className="increment"
              >
                +
              </button>
            </button>
          </>
        )}
      </div>
      <div className="desserts-card-body">
        <p className="desserts-card-category">{category}</p>
        <h3 className="desserts-card-name">{name}</h3>
        <p className="desserts-card-price">${price}</p>
      </div>
    </div>
  );
}

export default Product;
