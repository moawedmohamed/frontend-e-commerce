import type { FormEvent } from "react";

export interface themeOptions {
    name: string;
    label: string;
    colors: string[];
}
export interface Products {
    id: number;
    name: string;
    image: string
    price: number;
    // أضف أي حقول تانية موجودة في الـ API
}
export interface ProductStore {
    products: Products[],
    loading: boolean,
    error: string | null,
    currentProduct: Products|null   
    formData: {
        name: string;
        price: string;
        image: string;
    }
    setFormData: (newData: Partial<ProductStore['formData']>) => void
    resetForm: () => void
    addProduct: (e: FormEvent<HTMLFormElement>) => Promise<void>
    fetchProducts: () => Promise<void>
    fetchProduct: (id: number) => Promise<void>
    updateProduct: (id: number) => Promise<void>
    deleteProduct: (id: number) => Promise<void>
}