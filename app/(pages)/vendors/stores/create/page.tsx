/**
 * v0 by Vercel.
 * @see https://v0.dev/t/itVC1bCieth
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Button } from "@/components/ui/button"



export default function Component() {
  const counties = [
    "Baringo",
    "Bomet",
    "Bungoma",
    "Busia",
    "Elgeyo-Marakwet",
    "Embu",
    "Garissa",
    "Homa Bay",
    "Isiolo",
    "Kajiado",
    "Kakamega",
    "Kericho",
    "Kiambu",
    "Kilifi",
    "Kirinyaga",
    "Kisii",
    "Kisumu",
    "Kitui",
    "Kwale",
    "Laikipia",
    "Lamu",
    "Machakos",
    "Makueni",
    "Mandera",
    "Marsabit",
    "Meru",
    "Migori",
    "Mombasa",
    "Murang'a",
    "Nairobi",
    "Nakuru",
    "Nandi",
    "Narok",
    "Nyamira",
    "Nyandarua",
    "Nyeri",
    "Samburu",
    "Siaya",
    "Taita-Taveta",
    "Tana River",
    "Tharaka-Nithi",
    "Trans Nzoia",
    "Turkana",
    "Uasin Gishu",
    "Vihiga",
    "Wajir",
    "West Pokot",
  ];

  return (
    <main className="flex justify-center  items-center h-[100vh]">
      <Card className="w-full max-w-3xl items-center bg-slate-200">
        <CardHeader>
          <CardTitle className="text-2xl">Register Your Store</CardTitle>
          <CardDescription>
            Fill out the form below to register your ecommerce store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" placeholder="Enter store name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-category">Store Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home-decor">Home Decor</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="toys">Toys</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-location">Store Location</Label>
                <Input id="store-location" placeholder="Enter store location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-name">Owner Full Names</Label>
                <Input id="owner-name" placeholder="Enter owner name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="owner-email">Owner Email</Label>
                <Input
                  id="owner-email"
                  type="email"
                  placeholder="Enter owner email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-phone">Owner Phone</Label>
                <Input
                  id="owner-phone"
                  type="tel"
                  placeholder="Enter owner phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner-phone">Store Address</Label>
                <Input
                  id="owner-phone"
                  type="text"
                  placeholder="Enter store address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="owner-phone">County</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select county" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> 
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Store ward</Label>
                <Input
                  id="ward"
                  type="text"
                  placeholder="Enter store ward"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Store Area</Label>
                <Input
                  id="area"
                  type="text"
                  placeholder="Enter store Area"
                />
              </div>

            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="store-logo">Store Logo</Label>
                <Input id="store-logo" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-banner">Store Banner</Label>
                <Input id="store-banner" type="file" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="terms-conditions" />
              <Label htmlFor="terms-conditions">
                I agree to the{" "}
                <Link href="#" className="underline" prefetch={false}>
                  Terms and Conditions
                </Link>
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Register Store
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}