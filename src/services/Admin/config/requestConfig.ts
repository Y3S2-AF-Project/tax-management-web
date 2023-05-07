let admin = JSON.parse(localStorage.getItem("admin") || "{}");

const requestConfig = {
  headers: {
    authorization: "Bearer " + admin.accessToken || "",
    "Content-type": "multipart/form-data",
  },
};

export default requestConfig;
