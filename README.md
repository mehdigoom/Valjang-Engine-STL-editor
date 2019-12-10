
  

Valjang Engine STL Editor - Typescript - jest - enzyme - parcel - react router - fetch / axios - less / sass | Dev - prod

  

  

## How to build

  

## For build/run native project :

  

  

- juste run on classic web server.

  

  

## For build/run panel (react-parcel)

  

  

### For developement

  

  

**Get Node.js for your platform (https://nodejs.org/en/)**

  


  

    1.  cd .\panel\React-parcel\ 
    
    2.`npm install`
    
      
    
     3.`npm run dev`

  

  

### For production
**Get Node.js for your platform (https://nodejs.org/en/)**
      
       1.  cd .\panel\React-parcel\ 
      
    
    2.  `npm install`
    
      
    
    3.  `npm run build`

  



## What's inside?



  

**root**

  

***Native Directory***

  

### ------├── Index.html

### ------├── /obj (All 3D model for local use)

### ------├── /src (localhost:1234)

### ------│----└── /img

### ------│----└── /lib (all native librairies)

### ------│----└── /Style

### ------├── .gitignore

### ------└── README.md

  

***React- directory***

*../React-parcel*
### ------│
### ------├── Index.html
### ------├── Index.tsx (start code for react TS)
### ------├── /src (localhost:1234)
### ------│----└── compotents (all module and pages)
### ------│----└── /img (all local img )
### ------│----└── /Style (LESS code for style)
### ------└── package.json

  
  
  
  
  

  

1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

  

  

2.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

  

  

3.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

  

  

4.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

  

  

5.  **`README.md`**: A text file containing useful reference information about your project.

  

  

6.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

  

  

------------------

  

Structure du JS

  

src/js

  

compenents/ (Dump compenenet) Des composents normalement simple

  

pages/ (Hoc hight order compenent) Des composents parent qui font apelle a dautres. Avec plus de logique des les dump

  

  

------------------

  

Bundler: parcel-bundler

  

Il va traduire nos fichiers par exemple les .less en .css.

  

Parcel est livrer avec un sourcemap.qui permert de mapper les fichier de destination avec les fichier source pour ajuster le code par le suite.

  

Parcel recharge le render de la page a chaque sauvgarde du code.

  

-------------------

