import WebScene from '@arcgis/core/WebScene';
import SceneView from '@arcgis/core/views/SceneView';

export class App {

    private sceneView: __esri.SceneView;

    constructor(private container: HTMLDivElement) { }

    public run() {
        this.init();
    }

    private init(): void {
        this.initMapView();
        // add your code here.
    }

    private async initMapView(): Promise<void> {
        const map = new WebScene({
            basemap: 'satellite',
            ground: 'world-elevation',
        });
        this.sceneView = new SceneView({
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
