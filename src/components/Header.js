import React, {  } from "react";

const Title = {
  background: "#333",
  textAlign: "center",
  color: "#ffffff",
  padding: "10px",
};

const Header = () => {
  return (
    <React.Fragment>
      <div style={Title}>
        <h1>
          <b>Công Cụ Lọc Dữ Liệu</b>
        </h1>
      </div>
    </React.Fragment>
  );
};

export default Header;
