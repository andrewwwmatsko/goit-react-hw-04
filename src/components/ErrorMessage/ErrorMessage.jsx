import css from "./ErrorMessage.module.css";
import img from "../../images/9170816.jpg";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <img
        className={css.errorImage}
        src={img}
        alt="Oops, something went wrong. Please reload the page."
      />
      <p className={css.text}>
        Oops, something went wrong.{" "}
        <span className={css.smaller}>Please reload this page.</span>
      </p>
    </div>
  );
}
