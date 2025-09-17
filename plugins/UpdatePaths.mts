import {
    EditorPlugin,
    ui,
    data,
    project,
    MaterialResource,
    FlatMaterial,
    tools,
    ObjectResource,
    ProjectSettings,
    EditorSettings,
} from '@wonderlandengine/editor-api';

export default class UpdatePaths extends EditorPlugin {
    private _rootPath: string = '/src';

    constructor() {
        super();
        this.name = 'RotB - Update Paths';
    }

    draw(): void {
        ui.label('[ Sorskoot Wonderland Utils ]');
        ui.dummy(1, 16);
        ui.separator();

        ui.beginGroup();
        const newPath = ui.inputText('Script relative root', this._rootPath);
        if (newPath != null) {
            this._rootPath = newPath;
        }

        if (ui.button('Update Paths')) {
            this._updatePaths();
        }
        ui.endGroup();
    }

    private _updatePaths(): void {
        data.settings.scripting.sourcePaths
        //const projectRoot = ;

    }
}
