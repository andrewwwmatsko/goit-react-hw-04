import css from "./ImageCard.module.css";

export default function ImageCard({ image, onImageClick, openModal }) {
  const handleClick = () => {
    onImageClick(image);
    openModal(true);
  };
  return (
    <div className={css.container} onClick={handleClick}>
      <img src={image.urls.small} alt={image.description} className={css.img} />
    </div>
  );
}
