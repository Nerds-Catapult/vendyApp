import Image from "next/image";
import Header from "@/components/fragments/header";
import ProductCatalog from "@/components/fragments/catalogues/productcatalogue";
import { categories, products, brands } from "../data/dummy";

export default function Home() {
  return (
    <main className="">
      <Header />
      
      <section className="container mx-auto px-4 md:px-6 py-8">
        <ProductCatalog
          products={products}
          categories={categories}
          brands={brands}
        />
      </section>
    </main>
  );
}
