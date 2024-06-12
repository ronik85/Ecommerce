import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/Product-card'

const Home = () => {

    const addToCartHandler = () => {

    }
    return (
        <div className='home'>
            <section></section>
            <h1>
                Latest Product
                <Link to={'/search'} className='findmore'>More</Link>
            </h1>
            <main>
                <ProductCard productId='12' name='Macbok' price={25} photo='https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg' stock={5} handler={addToCartHandler} />
            </main>
        </div>
    )
}

export default Home
