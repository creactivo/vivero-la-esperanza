import { strapiApi, getImageUrl } from './api';

// Strapi 5: los campos están directamente en el objeto, no en "attributes"
export interface Proyecto {
    id: number;
    documentId: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    slug: string;
    imagenes: Array<{
        id: number;
        documentId: string;
        nombre: string;
        alternativeText: string | null;
        url: string;
        formats?: any;
    }>;
}

function normalizeProject(item: any): Proyecto | null {
    if (!item || !item.id) return null;

    return {
        id: item.id,
        documentId: item.documentId || item.id.toString(),
        nombre: item.nombre,
        descripcion: item.descripcion,
        activo: item.activo,
        slug: item.slug,
        imagenes: item.imagenes || [],
    };
}

export async function getProjects(): Promise<Proyecto[]> {
    try {
        const response = await strapiApi.get('/proyectos', {
            params: {
                populate: ['imagenes'],
                'filters[activo][$eq]': true,
            },
        });

        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data
                .map(normalizeProject)
                .filter((p): p is Proyecto => p !== null && p.slug);
        }

        return [];
    } catch (error) {
        console.error('[strapi-projects] Error al obtener proyectos:', error);
        return [];
    }
}

export async function getProjectsBySlug(slug: string): Promise<Proyecto | undefined> {
    try {
        const response = await strapiApi.get('/proyectos', {
            params: {
                populate: ['imagenes'],
                'filters[slug][$eq]': slug,
                'filters[activo][$eq]': true,
            },
        });
        if (response.data.data && response.data.data.length > 0) {
            return normalizeProject(response.data.data[0]);
        }
        return undefined;
    } catch (error) {
        console.error('Error fetching project:', error);
        return undefined;
    }
}

export { getImageUrl };