'use client'
import Navbar from "@/Components/Navbar"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const layout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    const router = useRouter()

    useEffect(() => {
        const checkIsAuth = () => {
            if (!isAuthenticated) {
                router.push('/login');
            }
        };

        checkIsAuth();
    }, [isAuthenticated]);

    return (
        <div className="pb-6" >
            <Navbar />
            {children}
        </div>
    )
}

export default layout