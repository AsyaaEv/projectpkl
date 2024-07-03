'use client'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundLogin from "../../components/logsign/BackgroundLogin";
import CardLogin from "../../components/logsign/CardLogin";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, PaperPlaneTilt } from "@phosphor-icons/react";
import Link from "next/link";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";

interface SignUpValidation {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export default function ForgetPassword() {

    const [toggleNewPassword, setToggleNewPassword] = useState(false)
    const [showcPassword, setShowcPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const name = 'Anggun Rasya Evaldo'
    const email = 'asyaaeval@gmail.com'
    const router = useRouter()



    const validate = (values: SignUpValidation) => {
        const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

        if (!values.name) {
            errors.name = 'reuqired.'
        }
        if (!values.email) {
            errors.email = 'required.'
        }
        if (toggleNewPassword) {
            if (values.password.length < 8) {
                errors.password = 'Password harus terdiri dari 8 karakter atau lebih'
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Konfirmasi password tidak cocok'
            }
        }
        return errors
    }

    const formik = useFormik<SignUpValidation>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: (values) => {
            if (values.name === name && values.email === email) {
                setToggleNewPassword(true)

            } else {
                toast.error("Kesalahan Data", {
                    description: "Nama atau Email Salah",
                })
            }

            if (toggleNewPassword) {

                if (values.password === values.confirmPassword) {
                    router.push('/login');
                    toast.success("Password Berhasil Dibuat", {
                        description: "Silakan Login",
                    });
                }
            }
        }
    })

    return (
        <BackgroundLogin>
            <CardLogin>
                <form onSubmit={formik.handleSubmit} className={`w-full `}>
                    <CardHeader className={`w-full flex justify-center items-center`}>
                        <CardTitle className="md:text-3xl">Lupa Password</CardTitle>
                        <CardDescription>Silakan masukan data di bawah ini untuk mengganti Password</CardDescription>
                    </CardHeader>
                    <CardContent className="md:w-full">
                        {toggleNewPassword ? (
                            <>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />
                                        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
                                        {!showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Input id="confirmPassword" type={showcPassword ? "text" : "password"} placeholder="Konfirmasi Password" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>}
                                        {!showcPassword ? <EyeClosed onClick={() => setShowcPassword(!showcPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowcPassword(!showcPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                                    </div>
                                </div>

                            </>

                        ) : (
                            <>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Input id="name" type="text" placeholder="Nama" value={formik.values.name} onChange={formik.handleChange} />
                                        {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Input id="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                                        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                                    </div>
                                </div>
                                <div className="w-full flex justify-end items-center mt-4">
                                    <Link href='/login' className="text-sm text-blue-500 hover:text-blue-600">kembali ke login</Link>
                                </div>
                            </>
                        )}

                    </CardContent>
                    <CardFooter className="flex justify-between w-full">
                        <Button type="submit" className="w-full  bg-sky-500 flex items-center justify-center gap-2 flex-row-reverse hover:bg-sky-600 text-base group"><PaperPlaneTilt weight="fill" className="size-4 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />Submit</Button>
                    </CardFooter>
                </form>
            </CardLogin>
        </BackgroundLogin>
    )
}