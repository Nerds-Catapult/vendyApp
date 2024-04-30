import Navbar from "./components/nav/Nav"
import BusinessCatalogue from './catalogues/businessCatalogue';
import BestSellers from "./catalogues/BestSellers";
import ProductCatalog from "./catalogues/productCatalogue";
import { FooterComponent } from "./components/footer/footer";


const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Beauty & Personal Care'];
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, image: 'https://shorturl.at/nvwCD'},
  { id: 2, name: 'T-shirt', category: 'Clothing', price: 15, image:"https://shorturl.at/nvwCD" },
  { id: 3, name: 'JavaScript: The Good Parts', category: 'Books', price: 20, image:"https://shorturl.at/nvwCD"},
  { id: 4, name: 'Headphones', category: 'Electronics', price: 50, image:"https://shorturl.at/nvwCD" },
  { id: 5, name: 'Dress', category: 'Clothing', price: 30, image:"https://shorturl.at/nvwCD" },
  { id: 6, name: 'React for Beginners', category: 'Books', price: 15, image:"https://shorturl.at/nvwCD" },
  { id: 7, name: 'Pillow', category: 'Home & Kitchen', price: 10 , image:"https://shorturl.at/nvwCD"},
  { id: 8, name: 'Shampoo', category: 'Beauty & Personal Care', price: 5 , image:"https://shorturl.at/nvwCD"},
  { id: 9, name: 'Mobile Phone', category: 'Electronics', price: 800, image:"https://shorturl.at/nvwCD" },
  { id: 10, name: 'Jeans', category: 'Clothing', price: 25, image:"https://shorturl.at/nvwCD" },
  { id: 11, name: 'TypeScript: The Good Parts', category: 'Books', price: 25, image:"https://shorturl.at/nvwCD" },
  { id: 12, name: 'Mouse', category: 'Electronics', price: 20, image:"https://shorturl.at/nvwCD" },
  { id: 13, name: 'Skirt', category: 'Clothing', price: 20, image:"https://shorturl.at/nvwCD" },
  { id: 14, name: 'Node.js for Beginners', category: 'Books', price: 10, image:"https://shorturl.at/nvwCD" },
  { id: 15, name: 'Curtains', category: 'Home & Kitchen', price: 40, image:"https://shorturl.at/nvwCD" },
  { id: 16, name: 'Conditioner', category: 'Beauty & Personal Care', price: 5, image:"https://shorturl.at/nvwCD" },
];


export default function App() {



  return (
    <main className="bg-gray-200 text-gray-900 h-full">
      <Navbar />
      <div className="px-3 py-5">
        <BusinessCatalogue />
      </div>
      <div className="px-3 py-5">
        <BestSellers />
      </div>
      <div className="px-3 py-5">
        <ProductCatalog products={products} categories={categories}/>
      </div>
      <FooterComponent />
    </main>
  )
}