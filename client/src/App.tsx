import Navbar from "./components/nav/Nav"
import ComingSoonBanner from "./components/Comingsoon/ComingSoon.tsx";
import { useEffect,  } from "react";

export default function App() {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            // Check common mobile user agent strings
            if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent) || /windows phone/i.test(userAgent)) {
                window.location.href = '/500';
            }

    }, []);


  return (
    <body className="bg-gray-100 text-gray-900 h-screen">
      <Navbar />
        <ComingSoonBanner />
    </body>
  )
}