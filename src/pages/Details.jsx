import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Details(){
    const { product_id } = useParams();
    const [product,setProduct] = useState(null);
    const [ loader,setLoader] = useState(false)
    
    const fetchProduct = () => {
        axios.get(`https://dummyjson.com/products/${product_id}`)
        .then(
            (Response) => {
                if(Response.status == 200){
                    setProduct(Response.data);
                }
            }
        )
    }

    useEffect(
        () => {
              if(product_id != null){
                fetchProduct();
              }
        },[product_id]
    )





    return (
      <div className="container mx-auto bg-gray-100 py-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto bg-white rounded-lg p-6">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-auto rounded-lg object-cover lg:w-full"
          />
        </div>
    
        {/* Product Information */}
        <div className="flex flex-col justify-center md:pl-6">
          <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
          <p className="text-gray-700 mb-4">{product?.description}</p>
    
          <div className="mb-4">
            <span className="text-xl font-semibold text-emerald-600">
              ${product?.price.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-red-500 line-through">
              ${(product?.price * (1 + product?.discountPercentage / 100)).toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-green-600">
              ({product?.discountPercentage}% off)
            </span>
          </div>
    
          <div className="mb-4">
            <span className="text-yellow-500">⭐</span> {product?.rating} / 5.0
          </div>
    
          <div className="mb-4">
            <span className="text-sm font-semibold">Stock:</span>
            <span className={`ml-2 ${product?.stock <= 5 ? 'text-red-600 font-bold' : 'text-green-600'}`}>
              {product?.availabilityStatus}
            </span>
          </div>
    
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add to Cart
          </button>
    
          {/* Additional Information */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Additional Information</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li><strong>Brand:</strong> {product?.brand}</li>
              <li><strong>SKU:</strong> {product?.sku}</li>
              <li><strong>Weight:</strong> {product?.weight}g</li>
              <li><strong>Dimensions:</strong> {product?.dimensions.width}cm x {product?.dimensions.height}cm x {product?.dimensions.depth}cm</li>
              <li><strong>Warranty:</strong> {product?.warrantyInformation}</li>
              <li><strong>Shipping:</strong> {product?.shippingInformation}</li>
              <li><strong>Return Policy:</strong> {product?.returnPolicy}</li>
            </ul>
          </div>
        </div>
      </div>
    
      {/* Reviews Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
        <div className="space-y-4">
          {product?.reviews.map((review, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-800">"{review.comment}"</p>
              <div className="text-yellow-500">⭐ {review.rating} / 5</div>
              <p className="text-xs text-gray-600">- {review.reviewerName}</p>
            </div>
          ))}
        </div>
      </div>
    
      {/* QR Code Section */}
      <div className="mt-6 flex justify-center">
        <img
          src={product?.meta.qrCode}
          alt="QR Code"
          className="w-32 h-32"
        />
      </div>
    </div>
    
    )
}