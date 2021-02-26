import { App } from './app/app'

import './main.css';

const app = new App(document.getElementById('map') as HTMLDivElement);
app.run();
