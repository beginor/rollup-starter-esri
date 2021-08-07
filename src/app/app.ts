import WebScene from '@arcgis/core/WebScene.js';
import SceneView from '@arcgis/core/views/SceneView.js';

import './app.scss';

export class App {

    private sceneView!: __esri.SceneView;
    /** app title */
    public title = '';

    constructor(private container: HTMLDivElement) { }

    /**
     * run the app.
     */
    public run(): void {
        this.init().catch(ex => console.error(ex));
    }

    private async init(): Promise<void> {
        await this.initMapView();
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
            center: [113.2, 23.4],
            viewingMode: 'global'
        });
        Object.assign(window, { _sceneView: this.sceneView });
        await this.sceneView.when();
    }

}
