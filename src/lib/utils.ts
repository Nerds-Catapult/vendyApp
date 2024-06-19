import { type ClassValue, clsx } from "clsx"
import Cookies from "js-cookie"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function CheckAuthState() {
  const customerToken = Cookies.get("customerToken")
  if (!customerToken) {
    window.location.href = "/auth/customer/login"
  }
}