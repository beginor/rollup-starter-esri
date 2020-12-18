// import { loadScript, loadModules } from 'esri-loader';

import { App } from './app/app'

import './main.css';
import '../node_modules/@arcgis/core/assets/esri/themes/light/main.css';

const app = new App(document.getElementById('map') as HTMLDivElement);
app.run();
