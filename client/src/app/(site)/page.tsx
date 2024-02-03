'use client'
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {

  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="flex flex-wrap gap-10  items-center justify-center mt-[50px] ">
      {
        products.map((item) => (
          <Link
            href={`/${item}`}
            key={item}
            className="flex bg-gray-100 rounded-xl justify-center items-center w-[300px] h-[400px] text-neutral-700 cursor-pointer hover:bg-neutral-50"
          >
            Product {item}
          </Link>
        ))
      }

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}
