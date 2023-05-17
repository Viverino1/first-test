/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'text': '#080807',
                'background': '#e9ebe6',
                'primary': '#545b49',
                'secondary': '#d1d6c7',
                'accent' : '#373b30'
            },

            // colors: {
            //     'text': '#d4d7f7',
            //     'background': '#141a17',
            //     'primary': '#3d9493',
            //     'secondary': '#0d2b13',
            //     'accent' : '#000000'
            // },

            spacing: {
                '19' : '76px',
                '21' : '84px',
                '22' : '88px',
                '23' : '92px',
                '25' : '100px',
                '26' : '104px',
                '34' : '136px',
                '68' : '272px',
                '100' : '400px',
                '104' : '416px',
                '106' : '424px',
                '108' : '432px',
            }
        },
    },
    plugins: [],
}

