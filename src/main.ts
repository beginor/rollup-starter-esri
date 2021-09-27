import './main.scss';

Object.assign(window, { esriConfig: {
    assetsPath: 'https://js.arcgis.com/4.21/', // eslint-disable-line max-len
    locale: 'zh-CN',
}});

import('./app/app').then(m => {
    const elementId = 'app';
    const container = document.getElementById(elementId);
    if (!container) {
        throw new Error(`Element with id ${elementId} doesn't exists !`)
    }
    const app = new m.App(container as HTMLDivElement);
    app.run();
}).catch(ex => {
    console.error(ex);
});
