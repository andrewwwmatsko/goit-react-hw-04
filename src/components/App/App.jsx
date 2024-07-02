import { useEffect, useState } from "react";

import { fetchPhotos } from "../../unsplash-api";

import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [photos, setPhotos] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getImages = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchImg() {
      try {
        setLoading(true);
        setError(false);
        setPhotos([]);

        const data = await fetchPhotos(searchQuery);
        setPhotos(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={getImages} />
      <main>
        {photos.length > 0 && <ImageGallery images={photos} />}
        {error && <ErrorMessage />}
        {loading && <Loader loading={loading} />}
      </main>
    </div>
  );
}
