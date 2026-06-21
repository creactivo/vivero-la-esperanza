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

function normalizeProject(item: any): Proyecto {
    const projectData = item.attributes || item;
    return {
        id: item.id,
        documentId: projectData.documentId || item.id.toString(),
        nombre: projectData.nombre,
        descripcion: projectData.descripcion,
        activo: projectData.activo,
        slug: projectData.slug,
        imagenes: projectData.imagenes || [],
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

        const proyectos = (response.data.data as any[]).map(normalizeProject);
        return proyectos.filter(
            (proyecto): proyecto is Proyecto => Boolean(proyecto && proyecto.slug)
        );
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