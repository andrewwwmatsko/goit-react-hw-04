import Modal from "react-modal";

import { RiCloseLargeFill, RiStarLine, RiStarFill } from "react-icons/ri";

import { formatDate } from "../../helpers/formatDate";

import css from "./ImageModal.module.css";
import { useState } from "react";

export default function ImageModal({
  isOpen,
  onSetModal,
  onAddToFav,
  imageData,
  removePhotoFromFav,
}) {
  const {
    created_at,
    description,
    urls,
    links: { download },
    likes,
    tags,
    user: { name, location },
    alt_description,
  } = imageData;

  const [isAdded, setIsAdded] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.65)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#F0F0F0",
    },
  };

  const onCloseModal = () => {
    onSetModal(false);
  };

  const handleBodyClassRemove = () => {
    document.body.classList.remove("ReactModal__Body--open");
  };

  const handleAddToFav = () => {
    if (isAdded) {
      setIsAdded(false);
      //logic for removal
      return;
    }
    onAddToFav(imageData);
    setIsAdded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
      className={css.modal}
      contentLabel="Image Modal window"
      preventScroll={true}
      onAfterClose={handleBodyClassRemove}
    >
      <div className={css.content}>
        <div className={css.btnGroup}>
          <button type="button" className={css.favBtn} onClick={handleAddToFav}>
            {isAdded ? (
              <RiStarFill size={28} color="darkblue" />
            ) : (
              <RiStarLine size={28} />
            )}
          </button>

          <button className={css.btn} onClick={onCloseModal} type="button">
            <RiCloseLargeFill size={28} />
          </button>
        </div>

        <img className={css.img} src={urls.regular} alt={alt_description} />

        <div className={css.infoListAndLink}>
          <ul className={css.infoWrapper}>
            <li className="imageInfo">
              <p className={css.imageInfoHeading}>Likes</p>
              <span className={css.imageInfo}>{likes}</span>
            </li>

            <li className="imageInfo">
              <p className={css.imageInfoHeading}>Featured in</p>
              <ul className={css.featuredIn}>
                {tags.map((el, i) => (
                  <li key={i}>
                    <span className={css.imageInfo}> {el.title}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <a
            href={download}
            rel="noreferrer noopener"
            target="_blank"
            download
            className={css.download}
            type="button"
          >
            Download
          </a>
        </div>
        <p className={css.description}>{description}</p>

        <div className={css.userInfo}>
          <div>
            <p className={css.name}>{name}</p>
            <p>{location}</p>
          </div>
          <p className={css.date}>{formatDate(created_at)}</p>
        </div>
      </div>
    </Modal>
  );
}
