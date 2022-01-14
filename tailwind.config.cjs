module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,svelte}"],
    theme: {
        extend: {},
        container: {
            center: true,
            padding: {
                DEFAULT: "3rem",
                sm: "4rem",
                lg: "6rem",
                xl: "7rem",
            }
        }
    },
    plugins: [require("daisyui")]
};
