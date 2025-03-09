// FIle: src/app/login/page.tsx
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { metadata } from "@/app/metadata";
import ChangePasswordForm from "./_components/change-password-form";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    document.title = metadata.login.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", metadata.login.description);
    }
  }, []);

  useEffect(() => {
    if (isHydrated && user && !user.mustChangePassword) {
      router.push("/dashboard");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) return null;

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Plannus
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {user && user.mustChangePassword ? (
              <ChangePasswordForm />
            ) : (
              <LoginForm />
            )}
            
          </div>
        </div>
      </div>
      <div className="relative hidden bg-slate-100 lg:block dark:bg-slate-800">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
