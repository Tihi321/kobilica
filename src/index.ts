import "./styles/style.css";
import { addBackground } from "./scripts";

import App from './App.svelte'

const app = new App({
  target: document.querySelector('.main')
});

addBackground(false);

export default app