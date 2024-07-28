import React from 'react'

const Loader = () => {
    return (
        <div>
            Loading...
        </div>
    )
}

export default Loader


interface skeletonProps {
    count?: number
}

export const Skeleton = ({ count = 3 }: skeletonProps) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <div key={index} className='skeleton-shape'></div>
    ))
    return <div className="skeleton-loader">
        {skeletons}
    </div>
}