'use client'
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundLogin from "../../components/logsign/BackgroundLogin";
import CardLogin from "../../components/logsign/CardLogin";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, PaperPlaneTilt } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <BackgroundLogin>
            <CardLogin>
                <CardHeader className="w-full flex justify-center items-center md:pb-8">
                    <CardTitle className="md:text-3xl">Login</CardTitle>
                    <CardDescription>Hei, Selamat datang kembali !!</CardDescription>
                </CardHeader>
                <CardContent className="md:w-full">
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" type="email" placeholder="Masukan email kamu" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukan password kamu" />
                                {!showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                            </div>
                        </div>
                    </form>
                    <div className="w-full flex justify-between items-center mt-4">
                        <Link href='/forget-password' className="text-sm text-blue-500 hover:text-blue-600">Lupa Password?</Link>
                        <Link href='/signup' className="text-sm text-blue-500 hover:text-blue-600">Daftar</Link>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between w-full">
                    <Button className="w-full bg-sky-500 flex items-center justify-center gap-2 flex-row-reverse hover:bg-sky-600 text-base"><PaperPlaneTilt weight="fill" className="size-4" />Login</Button>
                </CardFooter>
            </CardLogin>
        </BackgroundLogin>
    )
}