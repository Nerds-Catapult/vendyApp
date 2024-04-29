import ComingSoonBanner from "../../Comingsoon/ComingSoon.tsx";
import Navbar from "../../nav/Nav.tsx";

export default function Errands() {
    return (
        <body className="bg-gray-100 text-gray-900 h-screen">
        <Navbar/>
            <ComingSoonBanner/>
        </body>
    )
}