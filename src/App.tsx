import Navbar from "./components/nav/Nav"


import BusinessCatalogue from './catalogues/businessCatalogue';
import BestSellers from "./catalogues/BestSellers";


export default function App() {



  return (
    <main className="bg-gray-500 text-gray-900 h-screen">
      <Navbar />
      <div className="px-3 py-5">
        <BusinessCatalogue />
      </div>
      <div className="px-3 py-5">
        <BestSellers />
      </div>
    </main>
  )
}