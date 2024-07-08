
import BestSellers from "./catalogues/bestsellers"
import BusinessCatalogue from "./catalogues/businesscatalogue"
import ProductCatalog from "./catalogues/productcatalogue"

export default function Component() {
    return (
        <div className="bg-slate-300 py-8 ">
            <div className="m-auto">
                <BusinessCatalogue />
            </div>
            
            <div className=" mt-9">
                <BestSellers />
            </div>
        </div>
    )
}