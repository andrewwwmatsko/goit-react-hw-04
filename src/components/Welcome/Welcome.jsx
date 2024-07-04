import css from "./Welcome.module.css";

export default function Welcome() {
  return (
    <div className={css.container}>
      <p className={css.text}>We can find any image you want!</p>
    </div>
  );
}
