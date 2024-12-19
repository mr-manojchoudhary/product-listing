import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header className="shadow py-2">
        <Container className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">MyStore</h1>
            <ul className="flex gap-3 items-center text-[18px]">
                <li>
                    <Link>Store</Link>

                </li>
                <li>
                    <Link>Cart</Link>

                </li>

            </ul>
        </Container>
   </header>
    )
}