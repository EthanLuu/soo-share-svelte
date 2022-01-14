<script>
    export let name;
    export let width = "1rem";
    export let height = "1rem";
    let icons = [
        {
            box: 24,
            name: "bell",
            svg: `<path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />`
        },
        {
            box: 24,
            name: "search",
            svg: `<path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />`
        },
        {
            box: 24,
            name: "error",
            svg: `<path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />`
        },
        {
            box: 50,
            name: "loading",
            svg: `<path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"/>
            </path>`
        },
        {
            box: 24,
            name: "write",
            svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />`
        },
        {
            box: 24,
            name: "wrong",
            svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`
        },

    ];
    let displayIcon = icons.find((e) => e.name === name);
</script>

<svg
    class={$$props.class}
    fill="none"
    {width}
    {height}
    viewBox="0 0 {displayIcon.box} {displayIcon.box}"
    >{@html displayIcon.svg}</svg
>
