import { App } from './app/app'

import './main.css';

var app = new App(document.getElementById('map') as HTMLDivElement);
app.run();
