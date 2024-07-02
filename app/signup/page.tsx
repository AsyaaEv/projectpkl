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
import { useState } from "react";


interface SignUpValidation {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export default function SignUp() {

    const [showcPassword, setShowcPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const signupSchema = z.object({
        name: z.string().min(3, { message: 'Nama harus terdiri dari 3 karakter atau lebih' }),
        email: z.string().email({ message: 'Email tidak valid' }),
        password: z.string().min(8, { message: 'Password harus terdiri dari 8 karakter atau lebih' }),
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi password tidak cocok",
        path: ["confirmPassword"], // path of error
      });

    const formik = useFormik<SignUpValidation>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: toFormikValidationSchema(signupSchema),
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <BackgroundLogin>
            <CardLogin>
                <CardHeader className="w-full flex justify-center items-center">
                    <CardTitle className="md:text-3xl">Daftar</CardTitle>
                    <CardDescription>Silakan masukan data di bawah ini untuk mendaftar</CardDescription>
                </CardHeader>
                <form onSubmit={formik.handleSubmit} className="w-full">
                    <CardContent className="md:w-full">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="Nama Pengguna" value={formik.values.name} onChange={formik.handleChange} />
                                {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" type="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formik.values.password} onChange={formik.handleChange} className="pr-[3rem]" />
                                {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
                                {!showPassword ? <EyeClosed onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="confirmPassword" type={showcPassword ? "text" : "password"} placeholder="Konfirmasi Password" value={formik.values.confirmPassword} onChange={formik.handleChange} className="pr-[3rem]" />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>}
                                {!showcPassword ? <EyeClosed onClick={() => setShowcPassword(!showcPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" /> : <Eye onClick={() => setShowcPassword(!showcPassword)} className="absolute right-0 mr-[3rem] translate-y-1 size-5 hover:cursor-pointer text-slate-500 hover:text-black" />}
                                
                            </div>
                        </div>
                        <div className="w-full flex justify-end items-center mt-4">
                            <Link href='/login' className="text-sm text-blue-500 hover:text-blue-600">Sudah punya akun? Login</Link>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full">
                        <Button type="submit" className="w-full  bg-sky-500 flex items-center justify-center gap-2 flex-row-reverse hover:bg-sky-600 text-base"><PaperPlaneTilt weight="fill" className="size-4" />Daftar</Button>
                    </CardFooter>
                </form>
            </CardLogin>
        </BackgroundLogin >
    )
}