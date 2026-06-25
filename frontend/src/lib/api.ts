/**
 * Cliente HTTP compartido para la API de Strapi.
 * Centraliza la URL base y la función de utilidad para imágenes.
 */
import axios from 'axios';

const STRAPI_URL = import.meta.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
export const strapiApi = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Convierte una URL relativa de Strapi en una URL absoluta.
 */
export function getImageUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${STRAPI_URL}${url}`;
}