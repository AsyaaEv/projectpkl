import { ReactNode } from "react";

export default function BackgroundLogin({children}: {children: ReactNode}) {
    return (
        <>
            <main className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-sky-100 via-white to-sky-200">
                {children}
            </main>
        </>
    )
}