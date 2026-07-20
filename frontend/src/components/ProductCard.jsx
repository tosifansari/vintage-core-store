// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: 1
        }));
    };

    return (
        <div className="bg-neutral-900 border border-amber-900/10 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300 group flex flex-col justify-between">
            
            {/* Clickable Image to Product Details Screen */}
            <Link to={`/product/${product._id}`} className="relative overflow-hidden bg-neutral-950 aspect-square flex items-center justify-center block w-full">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    {/* Clickable Title to Product Details Screen */}
                    <Link to={`/product/${product._id}`}>
                        <h3 className="font-serif text-stone-200 text-lg tracking-wide mb-1 group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-stone-400 text-xs font-light line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                    <span className="text-xl font-medium text-amber-500 font-mono">
                        ${product.price}
                    </span>
                    
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                        className="bg-amber-600 hover:bg-amber-500 disabled:bg-stone-700 text-neutral-950 p-2.5 rounded transition-colors duration-200 flex items-center justify-center cursor-pointer shadow-md shadow-amber-600/10"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;