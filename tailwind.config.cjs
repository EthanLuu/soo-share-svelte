module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,svelte}"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "3rem",
                lg: "6rem",
                xl: "7rem",
            }
        }
    },
    plugins: [require("daisyui")]
};
