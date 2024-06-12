import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
    cartItem: any;
    // incrementHandler: (cartItem: any) => void;
    // decrementHandler: (cartItem: any) => void;
    // removeHandler: (id: string) => void;
};
const CartItems = ({ cartItem
    // , 
    // incrementHandler, decrementHandler, removeHandler,
}: CartItemProps) => {

    const { photo, productId, name, price, quantity } = cartItem;
    return (
        <div className="cart-item">
            <img src={photo} alt={name} />
            <article>
                <Link to={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>

            <div>
                <button
                // onClick={() => decrementHandler(cartItem)}
                >
                    -
                </button>
                <p>{quantity}</p>
                <button
                // onClick={() => incrementHandler(cartItem)}
                >
                    +
                </button>
            </div>

            <button
                // onClick={() => removeHandler(productId)}
            >
                <FaTrash />
            </button>
        </div>
    )
}

export default CartItems
