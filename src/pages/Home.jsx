import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { IoGridOutline } from "react-icons/io5";

import { FaThList } from "react-icons/fa";





export default function Home() {
    const [categories, setCategory] = useState([]);
    const [product_response, setProductResponse] = useState({});
    const [listing_mode,setListingMode] = useState(0);
    const {category_slug} = useParams();
    const [page,setPage] = useState(0);
    // const [searchQuery,setSearchQuery] = useSearchParams();

    const limit =20;
   
    // 0:grid, 1:list

    const fetchCategory = () => {
        
        
        axios.get("https://dummyjson.com/products/categories")
            .then( //fulfilled
                (response) => {
                    if (response.status == 200) {
                        setCategory(response.data);
                    }
                }
            ).catch( //rejected
                (error) => {
                    console.log(error.message)
                }
            )
    }
    const fetchProduct = () => {
        const skip = limit * page;
        let API = "https://dummyjson.com/products";
        if(category_slug != undefined){
            API += `/category/${category_slug}`;
        }else{
            API +=`?limit=${limit}&skip=${skip}`;
        }
        
        axios.get(API)
            .then( //fulfilled
                (response) => {
                    if (response.status == 200) {
                        setProductResponse(response.data);
                    }
                }
            ).catch( //rejected
                (error) => {
                    console.log(error.message);
                }
            )
    }

    useEffect(
        () => {
            fetchCategory();
          
        }, []

    )

    useEffect(
        () => {
            fetchProduct();
        },[
            category_slug, page  // first render and on change of category_slug
        ]
    )

    const pageChangeHandler = (page_number) =>{
        // setSearchQuery({page:page_number});
        setPage(page_number);
    }


    return (
        <Container>
            <div className="grid grid-cols-4 my-3 gap-3">
                <div >
                    <div className="text-center p-2 mb-2 bg-[#34495e] text-lg text-white">Categories</div>

                    <CategoryListing category_slug={category_slug} data={categories} />



                </div>
                <div className="col-span-3">
                    <div className="flex gap-2 text-center p-3 mb-2 bg-[#34495e] text-lg text-white justify-end">
                        <IoGridOutline 
                         className={`${listing_mode == 0 && 'text-blue-500'}`}
                        onClick={() => setListingMode(0)} />
                        <FaThList
                          className={`${listing_mode == 1 && 'text-blue-500'}`}
                        onClick={() => setListingMode(1)} />
                    </div>
                    <ProductListing listing_mode={listing_mode} data={product_response.products ?? []} />
                    <Pagination current_page={page} pageChangeHandler={pageChangeHandler} limit={limit} total_records={product_response?.total} />
                </div>

            </div>
        </Container>
    )
}

const ProductListing = ({data,listing_mode}) => {
    return (<div className={`grid ${listing_mode == 0 ? 'grid-cols-3' : 'grid-cols-1'}  gap-2`}>
        {
            data.map(
                (prod) => {
                    return (
                        <div 
    className={`group relative flex ${listing_mode === 0 ? 'flex-col' : 'flex'} items-start`} 
    key={prod.id}
>
    {/* Image Section */}
    <img
        src={prod.thumbnail}
        alt={prod.title}
        className={`aspect-square ${listing_mode === 0 ? 'aspect-h-1 aspect-w-1' : 'w-1/3'} w-full rounded-md bg-gray-200 lg:aspect-none lg:h-100 object-cover group-hover:opacity-75`}
    />

    {/* Description Section */}
    {listing_mode === 1 && (
        <p className="mt-2 text-sm text-gray-600">
            {prod.description}
        </p>
    )}

    {/* Details Section */}
    <div className={`${listing_mode === 0 ? 'mt-4 flex-1' : 'flex flex-col'} w-full`}>
        {/* Title */}
        <h3 className="text-lg text-gray-700 font-semibold mt-4">
            <Link to={`/product-details/${prod.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {prod.title}
            </Link>
        </h3>

        {/* Brand */}
        <p className="mt-1 text-sm text-gray-500">{prod.brand}</p>

        {/* Price */}
        <p className="text-sm font-medium text-gray-900">${prod.price}</p>
        
        {/* Availability */}
        {listing_mode === 1 && (
            <p className="mt-1 text-sm text-gray-500">{prod.availabilityStatus}</p>
        )}
    </div>
</div>

                    )
                }
            )
        }
    </div>
    )
}

const CategoryListing = ({data,category_slug}) => {
    return (
        <ul>
            <li className={`text-gray-700 border p-2 ${category_slug == undefined && 'bg-blue-500'}`} >
                            <Link to={"/"}>
                                All
                            </Link>

                        </li>
            {
                data.map(
                    (item, index) => {
                        return <li className={`${category_slug == item.slug && 'bg-blue-500 text-white'}text-gray-700 border p-2`} key={index}>
                            <Link to={`/${item.slug}`}>
                                {item.name}
                            </Link>

                        </li>
                    }
                )
            }
        </ul>
    )
}

const Pagination = ({current_page,pageChangeHandler, total_records,limit}) => {
    const totalPages = Math.ceil(total_records / limit);

    const pageElem = [];

    if(isNaN(totalPages) == false){
     for(let i=0;i<totalPages; i++){
        pageElem.push(
              <li>
        <span
        onClick={() =>pageChangeHandler(i)}
          href="#"
          className={`cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${i==current_page && '!bg-blue-500 text-white'}`}
        >
          {i+1}
        </span>
      </li>  
       )
      }
    }

    return (
        <>
  <nav aria-label="Page navigation example" className="my-5">
    <ul className="inline-flex -space-x-px text-lg">
      <li>
        <span
        style={{pointerEvents: current_page ==0 && 'none'}}
        onClick={() => pageChangeHandler(current_page-1)}
          href="#"
          className="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </span>
      </li>
      {pageElem}
      
   
      <li>
        <span
        style={{pointerEvents: current_page == totalPages-1 && 'none'}}
        onClick={() => pageChangeHandler(current_page+1)}
          href="#"
          className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </span>
      </li>
    </ul>
  </nav>
  
</>

    )
}