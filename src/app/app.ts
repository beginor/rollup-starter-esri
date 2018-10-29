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
        await this.getRequestToken();
        await this.initArcGisJsApi();
        await this.initMapView();
    }

    private getRequestToken(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.withCredentials = true;
            request.onreadystatechange = (evt) => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve();
                    }
                }
            };
            request.open('GET', 'https://gishub.gdepb.gov.cn/rest/request-token');
            request.send();
        });
    }

    private async initMapView(): Promise<void> {
        const [Map, SceneView, ElevationLayer] = await loadModules([
            'esri/Map',
            'esri/views/SceneView',
            'esri/layers/ElevationLayer'
        ]);
        const groundProps: __esri.GroundProperties = {
            surfaceColor: 'blue',
            layers: [
                // new ElevationLayer({
                //     url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
                // }),
                new ElevationLayer({
                    url: 'http://docker7.gdepb.gov.cn/arcgis/rest/services/BaseMap/WGS84_DEM/ImageServer'
                })
            ]
        };
        const mapProps: __esri.MapProperties = {
            basemap: 'satellite',
            ground: groundProps
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
            viewingMode: 'global'
        };
        this.view = new SceneView(viewProps);
        this.view.when(() => {
            console.log('SceneView inited!');
            // this.addFeatureLayer();
        });
    }

    private async initArcGisJsApi(): Promise<void> {
        const baseUrl = 'https://app.gdep.gov.cn/arcgis-js-api/library/4.9';
        loadScript({
            url: baseUrl + '/init.js',
            css: baseUrl + '/esri/css/main.css',
            dojoConfig: {
                async: true,
                locale: 'zh-cn'
            }
        });
        const [config] = await loadModules(['esri/config']);
        config.request.trustedServers.push('app.gdep.gov.cn')
    }

    private async addFeatureLayer(): Promise<void> {
        const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
        const props: __esri.FeatureLayerProperties = {
            url: 'https://gishub.gdepb.gov.cn/arcgis/rest/services/mapservices/wgs84_gd_sar_prov_simplify/MapServer/0',
            outFields: ['*'],
            popupEnabled: true,
            opacity: 0.3
        };
        const layer = new FeatureLayer(props);
        this.view.map.layers.add(layer);
    }

}
