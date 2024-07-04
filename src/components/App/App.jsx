import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { fetchPhotos } from "../../unsplash-api";

import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import Welcome from "../Welcome/Welcome";

const notify = () =>
  toast.error("There are no photos yet.", {
    duration: 2000,
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Date.now());

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const [favourites, setFavourites] = useState([]);
  // const [photoIdToRemove, setPhotoIdToRemove] = useState(null);

  const getImages = (query) => {
    setPhotos([]);
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleAddToFav = (newFav) => {
    setFavourites((prevFav) => {
      return [...prevFav, newFav];
    });
  };

  // const filteredPhotos = photos.filter((photo) => {
  //   return photo.id !== photoIdToRemove;
  // });

  const handleShowFav = () => {
    setPhotos(favourites);
    if (photos.length === 0) {
      notify();
      return;
    }
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
      <SearchBar onSearch={getImages} onShowFav={handleShowFav} />
      <main>
        {!searchQuery && <Welcome />}
        {photos.length > 0 && (
          <ImageGallery
            openModal={setIsModalOpen}
            onImageClick={setModalData}
            images={photos}
          />
        )}
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {photos.length > 0 &&
          !loading &&
          currentPage < totalPages &&
          !error && <LoadMoreBtn onAddMore={handleLoadMore} />}
      </main>

      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onSetModal={setIsModalOpen}
          imageData={modalData}
          onAddToFav={handleAddToFav}
        />
      )}
    </div>
  );
}
