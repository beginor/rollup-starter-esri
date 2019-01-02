import { App } from './app/app'

import './main.css';

let app: App;

document.addEventListener('DOMContentLoaded', e => {
    app = new App(document.getElementById('map') as HTMLDivElement);
    app.run();
});
