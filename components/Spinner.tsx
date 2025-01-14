import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }:{loading:boolean}) => {
  return (
    <ClipLoader
      color="#0760FB"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};
export default Spinner;
