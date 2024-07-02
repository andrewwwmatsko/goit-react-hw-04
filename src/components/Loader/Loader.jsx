import GridLoader from "react-spinners/GridLoader";

export default function Loader({ loading }) {
  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  };

  return (
    <GridLoader
      color={"darkblue"}
      loading={loading}
      size={20}
      speedMultiplier={0.85}
      cssOverride={override}
    />
  );
}
