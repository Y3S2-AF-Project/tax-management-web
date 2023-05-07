let admin = JSON.parse(localStorage.getItem("admin") || "{}");

const requestConfigJson = {
  headers: {
    authorization: "Bearer " + admin.accessToken || "",
    "Content-type": "application/x-www-form-urlencoded",
  },
};

export default requestConfigJson;
