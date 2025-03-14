import { Footer } from "@/components/public/footer";
import { Topbar } from "@/components/public/topbar";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar/>
            <div className="flex-grow flex justify-center bg-gray-100 dark:bg-gray-900">About</div>
            <Footer/>
        </div>
    )
}