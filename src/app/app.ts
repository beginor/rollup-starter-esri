import * as esri from 'esri-service';

export class App {

    private sceneView: __esri.SceneView;

    constructor(private container: HTMLDivElement) { }

    public run() {
        this.init().then(() => {
            console.log('app init');
        }).catch(ex => {
            console.error(ex);
        });
    }

    private async init(): Promise<void> {
        await this.initMapView();
        // add your code here.
    }

    private async initMapView(): Promise<void> {
        const map = await esri.createWebScene({
            basemap: 'satellite',
            ground: {
                surfaceColor: 'blue',
                layers: [
                    {
                        type: 'elevation',
                        url: 'http://docker7.gdepb.gov.cn/arcgis/rest/services/BaseMap/WGS84_DEM/ImageServer'
                    }
                ]
            },
            layers: [
                {
                    type: 'feature',
                    url: 'https://gishub.gdepb.gov.cn/arcgis/rest/services/mapservices/wgs84_gd_sar_prov_simplify/MapServer/0',
                    opacity: 0.7,
                    renderer: {
                        type: 'simple',
                        symbol: {
                            type: 'simple-line',
                            color: 'red',
                            width: 2
                        }
                    }
                }
            ]
        } as any);
        this.sceneView = await esri.createSceneView({
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
