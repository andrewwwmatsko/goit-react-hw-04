import css from "./ImageCard.module.css";

export default function ImageCard({ image, openModal }) {
  const handleClick = () => {
    openModal(image);
  };
  return (
    <div className={css.container} onClick={handleClick}>
      <img src={image.urls.small} alt={image.description} className={css.img} />
    </div>
  );
}
