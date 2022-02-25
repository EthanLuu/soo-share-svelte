export const host =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://sooshareapi.herokuapp.com";
