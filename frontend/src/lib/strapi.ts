import { strapiApi, getImageUrl } from './api';

export type { } from './api'; // Re-export por compatibilidad

// Strapi 5: los campos están directamente en el objeto, no en "attributes"
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioMayorista: number;
    cantidadMinima: number;
    stock: number;
    activo: boolean;
    slug: string;
    imagenes: Array<{
        id: number;
        name: string;
        alternativeText: string | null;
        url: string;
        formats?: any;
    }>;
    categoria: {
        id: number;
        nombre: string;
        descripcion: string;
        slug: string;
    };
}

export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    slug: string;
}

export interface HeroPrincipal {
    heading: string;
    subheading: string;
    imagenbanner: Array<{
        id: number;
        url: string;
        alternativeText: string | null;
    }>;
}

export interface SectionsPage {
    title: string;
    descriptions: string;
    componente: HeroPrincipal;
}

function normalizeCategory(category: any): Categoria | null {
    if (!category || !category.id || !category.attributes) return null;
    return {
        id: category.id,
        ...category.attributes,
    };
}

function normalizeProduct(item: any): Producto {
    const productData = item.attributes || item;
    return {
        id: item.id,
        nombre: productData.nombre,
        descripcion: productData.descripcion,
        precio: productData.precio,
        precioMayorista: productData.precioMayorista,
        cantidadMinima: productData.cantidadMinima,
        stock: productData.stock,
        activo: productData.activo,
        slug: productData.slug,
        imagenes: (productData.imagenes?.data || []).map((img: any) => ({ id: img.id, ...img.attributes })),
        categoria: normalizeCategory(productData.categoria?.data),
    };
}

export async function getProductos(): Promise<Producto[]> {
    try {
        const response = await strapiApi.get('/productos', {
            params: {
                populate: ['imagenes', 'categoria'],
                'filters[activo][$eq]': true,
            },
        });

        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data
                .map(normalizeProduct)
                .filter((producto: Producto) => producto && producto.slug);
        }

        console.warn('La respuesta de la API de productos no tiene la estructura esperada.');
        return [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductoBySlug(slug: string): Promise<Producto | undefined> {
    try {
        const response = await strapiApi.get('/productos', {
            params: {
                populate: ['imagenes', 'categoria'],
                'filters[slug][$eq]': slug,
                'filters[activo][$eq]': true,
            },
        });
        if (response.data.data && response.data.data.length > 0) {
            return normalizeProduct(response.data.data[0]);
        }
        return undefined;
    } catch (error) {
        console.error('Error fetching product:', error);
        return undefined;
    }
}

export async function getCategorias(): Promise<Categoria[]> {
    try {
        const response = await strapiApi.get('/categorias', {
            params: { populate: '*' },
        });

        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data
                .map(normalizeCategory)
                .filter((c): c is Categoria => c !== null);
        }
        return [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export async function getProductosByCategoria(categoriaSlug: string): Promise<Producto[]> {
    try {
        const response = await strapiApi.get('/productos', {
            params: {
                populate: ['imagenes', 'categoria'],
                'filters[categoria][slug][$eq]': categoriaSlug,
                'filters[activo][$eq]': true,
            },
        });
        const productos = response.data.data.map(normalizeProduct);
        return productos.filter((producto: any) => producto && producto.slug);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
}

export async function getSectionsPage(): Promise<SectionsPage | null> {
    try {
        const response = await strapiApi.get('/sections-page', {
            params: {
                populate: ['componente.imagenbanner'],
            },
        });
        
        if (response.data && response.data.data) {
            return response.data.data as SectionsPage;
        }
        return null;
    } catch (error) {
        console.error('Error fetching sections page:', error);
        return null;
    }
}

export { getImageUrl };