import axios from 'axios';
import iziToast from "izitoast";

const API_KEY = '49134473-b6b93407d1e87dbb8b9cabdc4';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 40) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    if (response.data.hits.length === 0) {
      throw new Error("Sorry, there are no images matching your search query. Please try again!");
    }
    return response.data;
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: error.message || "Something went wrong. Please try again!",
      position: "topRight",
    });
    throw error;
  }
}