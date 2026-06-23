import axios from 'axios';

const STRAPI_URL = "http://127.0.0.1:1337";
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    ...{}
  }
});
function getImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export { getImageUrl as g, strapiApi as s };
