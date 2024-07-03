
import {
    Card,
} from "@/components/ui/card"
import Image from "next/image"
import vLogin from '../../public/assets/vLogin.svg'
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

export default function CardLogin({ children }: { children: ReactNode }) {

    const pathname = usePathname()
    return (
        <div className={`w-full ${pathname === '/signup' ? 'h-auto' : null} md:w-[90%] lg:max-w-[60rem] md:h-auto gap-2 md:py-0 ${pathname === '/login' ? 'md:h-[60%] md:py-12' : null} ${pathname === '/forget-password' ? 'md:h-[60%] md:py-12' : null} flex flex-col md:flex-row md:items-center items-end justify-between transition-all drop-shadow-2xl  md:bg-white/80 rounded-[10px] backdrop-blur-sm`}>
            <div className="w-full flex md:flex h-full transition-all justify-center items-center">
                <Image src={vLogin} alt="login" width={100} className="w-[50%]" />
            </div>
            <Card className={`w-full h-full md:h-full md:rounded-tl-none md:rounded-bl-none md:rounded-tr-[10px] md:rounded-br-[10px] transition-all md:flex md:justify-center md:items-center md:flex-col border-0 bg-transparent shadow-transparent overflow-hidden`}>
                {children}
            </Card>
        </div>
    )
}