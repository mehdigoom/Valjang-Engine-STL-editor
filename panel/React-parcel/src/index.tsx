// J'importe React
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//On importe le composant App
 import App from "./app";

//On stock dans la variable MOUNT_NODE, l'élément HTML dans lequelle on va monter l'application REACT
const MOUNT_NODE = document.getElementById("app");

//ReactDOM va générer un DOM virtuel à partir de notre MOUNT_NODE
ReactDOM.render(<App/>, MOUNT_NODE);