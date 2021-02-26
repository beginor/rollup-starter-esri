import { loadScript } from 'esri-loader';
import * as arcgis from 'esri-service';

export class App {

    /** @private @type {__esri.SceneView} */
    sceneView = undefined;
    /** @private @type {HTMLDivElement} */
    container = undefined;
    /** app title */
    title: string = '';

    constructor() { }

    /**
     * run the app.
     */
    run() {
        this.init().catch(ex => console.error(ex));
    }

    /** @private */
    async init() {
        await this.initArcGISApi()
        await this.initMapView();
    }

    /** @private */
    async initArcGISApi() {
        const baseUrl = 'https://app.gdeei.cn/arcgis-js-api/library/4.17';
        await loadScript({
            url: `${baseUrl}/init.js`,
            css: `${baseUrl}/esri/css/main.css`,
            dojoConfig: {
                async: true,
                locale: 'zh-cn',
                has: {
                    'esri-native-promise': true
                }
            }
        });
    }

    /** @private */
    async initMapView() {
        const map = await arcgis.createWebScene({
            basemap: 'satellite',
            ground: 'world-elevation',
        });
        this.sceneView = await arcgis.createSceneView({
            container: this.container,
            map: map,
            zoom: 7,
            center: {
                longitude: 113.2,
                latitude: 23.4
            },
            viewingMode: 'global'
        });
        window['_sceneView'] = this.sceneView;
        await this.sceneView.when();
        console.log('SceneView inited!');
    }

}
