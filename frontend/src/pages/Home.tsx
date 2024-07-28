import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/Product-card";
import { useLatestProductsQuery } from "../redux/api/ProductApi";

const Home = () => {
    const { data, isLoading, isError } = useLatestProductsQuery("");

    const addToCartHandler = () => { };
    if (isError) toast.error("Cannot Fetch the product")
    return (
        <div className="home">
            <section></section>
            <h1>
                Latest Product
                <Link to={"/search"} className="findmore">
                    More
                </Link>
            </h1>

            <main>
                {isLoading ? <Skeleton /> : data?.products.map((item) => (
                    <ProductCard
                        key={item._id}
                        productId={item._id}
                        name={item.name}
                        price={item.price}
                        photo={item.photo}
                        stock={item.stock}
                        handler={addToCartHandler}
                    />
                ))}
            </main>
        </div>
    );
};

export default Home;
