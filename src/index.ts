import "./styles/style.css";
import { addBackground } from "./scripts";

import Content from './Content.svelte'

const content = new Content({
  target: document.querySelector('.content')
});

addBackground(false);

export default content