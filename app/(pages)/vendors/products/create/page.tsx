"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import toast from "react-hot-toast"

interface Product {
  productName: string
  productPrice: number
  productImage: File | null
  productDescription: string
  categoryId: number 
  storeId: number 
  quantity: number
}

interface Errors {
  productName: boolean
  productPrice: boolean
  productImage: boolean
  productDescription: boolean
  categoryId: boolean
  storeId: boolean
  quantity: boolean
}

export default function CreateProduct() {
  const [product, setProduct] = useState<Product>({
    productName: "",
    productPrice: 0,
    productImage: null,
    productDescription: "",
    categoryId: 0,
    storeId: 0,
    quantity: 0,
  })

  const [errors, setErrors] = useState<Errors>({
    productName: false,
    productPrice: false,
    productImage: false,
    productDescription: false,
    categoryId: false,
    storeId: false,
    quantity: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & { files: FileList }
    
    const newValue = name === 'productPrice' || name === 'quantity' ? parseFloat(value) : value;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : newValue,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    const newValue = parseInt(value, 10);
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    let hasErrors = false
    const newErrors = { ...errors }

    Object.entries(product).forEach(([key, value]) => {
      if (key !== 'productImage' && !value) {
        newErrors[key as keyof Errors] = true
        hasErrors = true
      }
    })

    setErrors(newErrors)
    if (hasErrors) {
      setIsSubmitting(false)
      return
    }
    
    // Handle image upload here if needed and set the imageUrl
    // const imageUrl = await uploadImage()
    // if (!imageUrl) {
    //   setIsSubmitting(false)
    //   return
    // }

    const productData = {
      ...product,
      // productImage: imageUrl, // Replace with actual image URL after uploading
      productImage: 'http://example.com/image.jpg',
    }
    

    try {
      const response = await axios.post("http://localhost:4200/api/products", productData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      })

      if (response.status === 201) {
        toast.success("Product created successfully")
        handleCancel()
      } else {
        toast.error("Error creating product")
      }
    } catch (error) {
      toast.error("Error creating product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setProduct({
      productName: "",
      productPrice: 0,
      productImage: null,
      productDescription: "",
      categoryId: 0,
      storeId: 0,
      quantity: 0,
    })
    setErrors({
      productName: false,
      productPrice: false,
      productImage: false,
      productDescription: false,
      categoryId: false,
      storeId: false,
      quantity: false,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">Create a New Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              name="productName"
              type="text"
              value={product.productName}
              onChange={handleInputChange}
              className={errors.productName ? "border-red-500" : ""}
            />
            {errors.productName && <p className="text-red-500">Please enter a product name.</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productPrice">Price</Label>
            <Input
              id="productPrice"
              name="productPrice"
              type="number"
              value={product.productPrice}
              onChange={handleInputChange}
              className={errors.productPrice ? "border-red-500" : ""}
            />
            {errors.productPrice && <p className="text-red-500">Please enter a valid price.</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="productImage">Product Image</Label>
            <Input
              id="productImage"
              name="productImage"
              type="file"
              onChange={handleInputChange}
              className={errors.productImage ? "border-red-500" : ""}
            />
            {errors.productImage && <p className="text-red-500">Please upload a product image.</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              name="productDescription"
              value={product.productDescription}
              onChange={handleInputChange}
              className={errors.productDescription ? "border-red-500" : ""}
            />
            {errors.productDescription && <p className="text-red-500">Please enter a product description.</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={product.categoryId?.toString() ?? ""}
              onValueChange={(value) => handleSelectChange("categoryId", value)}
            >
              <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Electronics</SelectItem>
                <SelectItem value="2">Clothing</SelectItem>
                <SelectItem value="3">Home</SelectItem>
                <SelectItem value="4">Sports</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500">Please select a product category.</p>}
          </div>
          <div className="grid gap-2">
            <Label>Store</Label>
            <Select
              value={product.storeId?.toString() ?? ""}
              onValueChange={(value) => handleSelectChange("storeId", value)}
            >
              <SelectTrigger className={errors.storeId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Store 1</SelectItem>
                <SelectItem value="2">Store 2</SelectItem>
                <SelectItem value="3">Store 3</SelectItem>
              </SelectContent>
            </Select>
            {errors.storeId && <p className="text-red-500">Please select a store.</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleInputChange}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && <p className="text-red-500">Please enter a valid quantity.</p>}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
