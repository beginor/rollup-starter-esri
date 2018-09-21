import { loadScript, loadModules } from 'esri-loader';

export class App {

    private view: __esri.SceneView;

    constructor(private container: HTMLDivElement) { }

    public run() {
        this.init().then(() => {
            console.log('app init');
        }).catch(ex => {
            console.error(ex);
        });
    }

    private async init(): Promise<void> {
        await this.initArcGisJsApi();
        await this.initMapView();
    }

    private async initMapView(): Promise<void> {
        const [Map, SceneView] = await loadModules([
            'esri/Map',
            'esri/views/SceneView'
        ]);
        const mapProps: __esri.MapProperties = {
            basemap: 'satellite',
            ground: 'world-elevation'
        };
        const map = new Map(mapProps);
        const viewProps: __esri.SceneViewProperties = {
            container: this.container,
            map: map,
            zoom: 7,
            center: {
                longitude: 113.2,
                latitude: 23.4
            },
            viewingMode: 'local'
        };
        this.view = new SceneView(viewProps);
        this.view.when(() => {
            console.log('SceneView inited!');
            this.addFeatureLayer();
        });
    }

    private async initArcGisJsApi(): Promise<void> {
        loadScript({
            url: 'https://app.gdep.gov.cn/arcgis-js-api/library/4.8/init.js',
            css: 'https://app.gdep.gov.cn/arcgis-js-api/library/4.8/esri/css/main.css',
            dojoConfig: {
                async: true,
                locale: 'zh-cn'
            }
        });
        const [config] = await loadModules(['esri/config']);
        config.request.corsEnabledServers.push('app.gdep.gov.cn');
        config.request.corsEnabledServers.push('127.0.0.1:8088');
    }

    private async addFeatureLayer(): Promise<void> {
        const [FeatureLayer] = loadModules['esri/layers/FeatureLayer'];
        const featureLayerProps: __esri.FeatureLayerProperties = {
            url: '',
            outFields: ['*'],
            popupEnabled: true,
            renderer: {}
        };
    }

}
