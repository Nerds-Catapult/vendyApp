import Header from '@/components/fragments/header';
import ProductCatalogue from '@/components/fragments/catalogues/productcatalogue';

export default function Home() {
    return (
        <main className="">
            <Header />
            <section className="container mx-auto px-4 md:px-6 py-8">
                <ProductCatalogue />
            </section>
        </main>
    );
}
