import css from "./ErrorMessage.module.css";
import img from "../../images/9170816.jpg";

export default function ErrorMessage() {
  return (
    <img
      className={css.errorImage}
      src={img}
      alt="Oops, something went wrong. Please reload the page."
    />
  );
}
