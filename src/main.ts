import { loadScript, loadModules } from 'esri-loader';

import { App } from './app/app'

import './main.css';

let app: App;

document.addEventListener('DOMContentLoaded', e => {
    // get request token first
    getRequestToken().then(() => {
        // then init arcgis js api
        return initArcGisJsApi();
    }).then(() => {
        // and then run app
        app = new App(document.getElementById('map') as HTMLDivElement);
        app.run();
    });

});

async function getRequestToken(): Promise<void> {
    const res = await fetch(
        'https://gishub.gdepb.gov.cn/rest/request-token',
        { method: 'get', credentials: 'include' }
    );
    if (!res.ok) {
        throw new Error('Can not get request token from gishub !');
    }
}

async function initArcGisJsApi(): Promise<void> {
    const baseUrl = 'https://app.gdep.gov.cn/arcgis-js-api/library/4.10';
    loadScript({
        url: baseUrl + '/init.js',
        css: baseUrl + '/esri/css/main.css',
        dojoConfig: {
            async: true,
            locale: 'zh-cn'
        }
    });
    const [config] = await loadModules(['esri/config']);
    config.request.trustedServers.push('gishub.gdepb.gov.cn')
}
