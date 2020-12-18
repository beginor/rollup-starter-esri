import { loadScript } from 'esri-loader';
import * as arcgis from 'esri-service';

export class App {

    private sceneView: __esri.SceneView;

    constructor(private container: HTMLDivElement) { }

    public run(): void {
        this.init().catch(ex => console.error(ex));
    }

    private async init(): Promise<void> {
        await this.initArcGISApi()
        await this.initMapView();
        // add your code here.
    }

    private async initArcGISApi(): Promise<void> {
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

    private async initMapView(): Promise<void> {
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
