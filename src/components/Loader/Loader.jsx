import GridLoader from "react-spinners/GridLoader";

export default function Loader() {
  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  };

  return (
    <GridLoader
      color={"darkblue"}
      size={20}
      speedMultiplier={0.85}
      cssOverride={override}
    />
  );
}
