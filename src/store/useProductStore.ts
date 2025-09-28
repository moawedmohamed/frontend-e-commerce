import { create } from 'zustand'
import axios from 'axios'
import type { ProductStore } from '../types';
import toast from 'react-hot-toast';
import type { FormEvent } from 'react';
const BASE_URL: string = 'http://localhost:3000'
export const useProductStore = create<ProductStore>((set, get) => ({
    //product state
    products: [],
    loading: false,
    error: null,
    currentProduct: null,
    // form state
    formData: {
        name: "",
        price: "",
        image: ""
    },
    setFormData: (newData: Partial<ProductStore['formData']>) => set({ formData: { ...get().formData, ...newData } }),
    resetForm: () => set({ formData: { name: "", price: "", image: "" } }),
    addProduct: async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        set({ loading: true })
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/products`, formData)
            await get().fetchProducts();
            get().resetForm()
            toast.success('product added successfully');
            (document.getElementById('add_product_modal') as HTMLDialogElement).close()
        } catch (error) {
            console.log(error);
            toast.error("something went wrong ")
        } finally {
            set({ loading: false })
        }
    },
    fetchProducts: async () => {
        set({ loading: true });
        try {

            const res = await axios.get(`${BASE_URL}/api/products`)
            set({ products: res.data.data, error: null })
        } catch (error: any) {
            if (error?.response?.status === 429) {
                set({ error: "Rate limit exceeded", products: [] })
            } else {
                set({ error: "Something went wrong", products: [] })

            }
            // console.log(error);
        } finally {
            set({ loading: false });

        }
    },
    deleteProduct: async (id: number) => {
        try {
            set({ loading: true })
            await axios.delete(`${BASE_URL}/api/products/${id}`)
            set(prev => ({ products: prev.products.filter(product => product.id !== id) }))
            toast.success("Product deleted successfully")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong ")
        } finally {
            set({ loading: false })

        }
    },
    fetchProduct: async (id: number) => {
        set({ loading: true })
        try {
            const res = await axios.get(`${BASE_URL}/api/products/${id}`)
            set({ currentProduct: res.data.data, formData: res.data.data });
        } catch (error) {
            console.log('Error is FetchProduct functions', error);
            set({ error: "Something wen wrong", currentProduct: null })
        } finally {
            set({ loading: false })

        }
    },
    updateProduct: async (id: number) => {
        set({ loading: true })
        try {
            const { formData } = get()
            const res = await axios.put(`${BASE_URL}/api/products/${id}`)
            set({ currentProduct: res.data.data });
            toast.success('Product updated successfully')
        } catch (error) {
            toast.error('Something went wrong')
            console.log('Error is FetchProduct functions', error);
        } finally {
            set({ loading: false })

        }
    }
}))

