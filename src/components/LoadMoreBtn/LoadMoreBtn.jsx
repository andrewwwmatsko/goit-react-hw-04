import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onAddMore }) {
  return (
    <button className={css.btn} onClick={onAddMore}>
      Load more
    </button>
  );
}
