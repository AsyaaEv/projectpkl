'use client'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundLogin from "../../components/logsign/BackgroundLogin";
import CardLogin from "../../components/logsign/CardLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, PaperPlaneTilt } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginProps {
    email: string
    password: string
}
export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [animatetoforget, setAnimatetoforget] = useState(false)

    const email = 'asyaaeval@gmail.com'
    const password = '12345678'
    const router = useRouter()


    const loginSchema = z.object({
        email: z.string(),
        password: z.string()
    })
    const formik = useFormik<LoginProps>({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: toFormikValidationSchema(loginSchema),
        onSubmit: (values) => {
            if (values.email === email && values.password === password) {
                toast.success('Login berhasil')
                
            } else {
                toast.error('Kesalahan Data', {
                    description: 'Email atau Password salah'
                })
            }
        }
    })
    return (
        <BackgroundLogin>
            <CardLogin>
                <form onSubmit={formik.handleSubmit} className={`w-full  ${animatetoforget ? '-translate-x-[100%] transition-all duration-500' : ''}`}>
                <CardHeader className={`w-full flex justify-center items-center md:pb-8 `}>
                    <CardTitle className="md:text-3xl">Login</CardTitle>
                    <CardDescription>Hei, Selamat datang kembali !!</CardDescription>
                </CardHeader>
                    <CardContent className={`md:w-full `}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" type="email" placeholder="Masukan email kamu" value={formik.values.email} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukan password kamu" value={formik.values.password} onChange={formik.handleChange} />
                                {!showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                                {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center mt-4">
                            <Link href='/forget-password'  className="text-sm text-blue-500 hover:text-blue-600">Lupa Password?</Link>
                            <Link href='/signup' className="text-sm text-blue-500 hover:text-blue-600">Daftar</Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full">
                        <Button type="submit" className="w-full bg-sky-500 flex items-center justify-center gap-2 flex-row-reverse hover:bg-sky-600 text-base group"><PaperPlaneTilt weight="fill" className="size-0 group-hover:size-4 transition-all duration-300" />Login</Button>
                    </CardFooter>
                </form>
            </CardLogin>
        </BackgroundLogin>
    )
}