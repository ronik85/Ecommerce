import { FaExpandAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";
import { server } from "../redux/store";

type ProductCardProp = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem: CartItem) => void;
};
const ProductCard = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler,
}: ProductCardProp) => {
    return (
        <div className="product-card">
            <img src={`${server}/${photo}`} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>

            <div>
                <button
                    onClick={() =>
                        handler({
                            productId,
                            price,
                            name,
                            photo,
                            stock,
                            quantity: 1,
                        })
                    }
                >
                    <FaPlus />
                </button>

                <Link to={`/product/${productId}`}>
                    <FaExpandAlt />
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
