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
            console.log('SceneView inited!')
        });
    }

    private async initArcGisJsApi() {
        loadScript({
            url: 'https://js.arcgis.com/4.6/init.js',
            css: 'https://js.arcgis.com/4.6/esri/css/main.css',
            dojoConfig: {
                async: true,
                locale: 'zh-cn'
            }
        });
        const [config] = await loadModules(['esri/config']);
        config.request.corsEnabledServers.push('app.gdep.gov.cn');
    }


}
