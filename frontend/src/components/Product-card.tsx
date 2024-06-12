import { FaPlus } from "react-icons/fa"

type ProductCardProp = {
    productId: string
    photo: string
    name: string
    price: number
    stock: number
    handler: () => void
}
const ProductCard = ({ productId, photo, name, price, handler }: ProductCardProp) => {
    const server = "dfdf"
    return (
        <div className="product-card">
            <img src={photo} alt={name} />
            <p>{name}</p>
            <span>&#x20b9; {price}</span>

            <div>
                <button onClick={() => handler}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard
