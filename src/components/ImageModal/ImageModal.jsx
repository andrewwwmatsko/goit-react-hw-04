import Modal from "react-modal";

import css from "./ImageModal.module.css";

export default function ImageModal({
  isOpen,
  onSetModal,
  imageData: {
    created_at,
    description,
    urls,
    links,
    likes,
    tags,
    user: { name },
    location,
  },
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const onCloseModal = () => {
    onSetModal(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
      contentLabel="Image Modal window"
      preventScroll={true}
    >
      <button onClick={onCloseModal} type="button">
        X
      </button>

      <img src={urls.regular} alt={description} />

      <ul className={css.infoWrapper}>
        <li className="imageInfo">
          <p className={css.imageInfoHeading}>Likes</p>
          <span className={css.imageInfo}>{likes}</span>
        </li>
        {/* <li className="imageInfo">
          <p className={css.imageInfoHeading}>Downloads</p>
          <span className={css.imageInfo}></span>
        </li> */}
        <li className="imageInfo">
          <p className={css.imageInfoHeading}>Featured in</p>
          <ul>
            {tags.map((el, i) => (
              <li key={i}>
                <span> {el.title}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <p className={css.description}>{description}</p>
    </Modal>
  );
}
