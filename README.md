# Project Name:
social-media-world-client

# Live Website Link:
https://social-media-world-client.vercel.app/

# Admin information:
 Email: admin@gmail.com
 PassWord: A$fTYTY^&&^&&^vvdh%GGHJs55hdhhsdjhG55&FGFG

1. Vite react app setup

create a new folder and give a suitable name and open this folder on vs code, then run these code on the terminal :

npm create vite@latest .
npm install

npm run dev

2. tailwind setup

search tailwind, click Installation, click Framework Guides, click Vite :

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


in tailwind.config.js file :

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

in index.css file :

@tailwind base;
@tailwind components;
@tailwind utilities;


npm run dev

3. daisyui setup 
== daisyui holo tailwind use kore kisu pre-build component create kore rakhe, ta amra use korte pari

search daisyui, click Install daisyUI as a Tailwind CSS plugin :

npm i -D daisyui@latest


Add daisyUI to tailwind.config.js :

  plugins: [
    require('daisyui'),
  ],

go to themes option:

daisyui: {
    themes: ["light"],
  },

4. react router dom setup :

search react router dom, click Tutorial, inside it setup option :

npm install react-router-dom
npm install localforage match-sorter sort-by

npm run dev

5. firebase authentication :

click firebase authentication, click go to console, click add project, give project name, click continue,
enable or stop google analytics option, click create project option. finish create project now click continue :

from dashboard click web </>, give app register name, don't need to click hosting now, click only continue to console :

from dashboard click project overview, click project settings :

npm install firebase

