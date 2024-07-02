import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

export default function ImageGallery({ images }) {
  return (
    <ul className={css.list}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.item}>
            <ImageCard image={image} />
          </li>
        );
      })}
    </ul>
  );
}
