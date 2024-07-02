import { useEffect, useState } from "react";

import { fetchPhotos } from "../../unsplash-api";

import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Date.now());

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getImages = (query) => {
    setPhotos([]);
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (!searchQuery) return;

    async function fetchImg() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchPhotos(searchQuery, currentPage);

        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data.results];
        });

        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImg();
  }, [searchQuery, currentPage]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={getImages} />
      <main>
        {photos.length > 0 && <ImageGallery images={photos} />}
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {photos.length > 0 && !loading && currentPage < totalPages && (
          <LoadMoreBtn onAddMore={handleLoadMore} />
        )}
      </main>
    </div>
  );
}
