import { useRef } from "react";
import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick, openModal }) {
  return (
    <ul className={css.list}>
      {images.map((image) => {
        return (
          <li key={image.id} className={css.item}>
            <ImageCard
              openModal={openModal}
              onImageClick={onImageClick}
              image={image}
            />
          </li>
        );
      })}
    </ul>
  );
}
