import Navbar from "./components/nav/Nav"
import ComingSoonBanner from "./components/Comingsoon/ComingSoon.tsx";


export default function App() {
  return (
    <body className="bg-gray-100 text-gray-900 h-screen">
      <Navbar />
        <ComingSoonBanner />
    </body>
  )
}