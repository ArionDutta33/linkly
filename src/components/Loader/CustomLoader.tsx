import React, { type CSSProperties } from "react";
import { RiseLoader } from "react-spinners";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
type CustomLoaderProps = {
  color?: string;
  loading: boolean;
};
const CustomLoader: React.FC<CustomLoaderProps> = ({
  color = "green",
  loading,
}) => {
  return (
    <div>
      <RiseLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default CustomLoader;
