/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#2C3639',
                'secondary': '#3F4E4F',
                'tertiary': '#A27B5C',
                'quaternary': '#DCD7C9',
            },
            spacing: {
                '19' : '76px',
                '21' : '84px',
                '22' : '88px',
                '23' : '92px',
                '25' : '100px',
                '26' : '104px',
                '34' : '136px',
                '68' : '272px',
                '104' : '416px',
                '106' : '424px',
                '108' : '432px',
            }
        },
    },
    plugins: [],
}

