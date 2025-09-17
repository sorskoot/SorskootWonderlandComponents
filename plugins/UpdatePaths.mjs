// plugins/UpdatePaths.mts
import {
  EditorPlugin,
  ui,
  data
} from "@wonderlandengine/editor-api";
var UpdatePaths = class extends EditorPlugin {
  _rootPath = "/src";
  constructor() {
    super();
    this.name = "RotB - Update Paths";
  }
  draw() {
    ui.label("[ Sorskoot Wonderland Utils ]");
    ui.dummy(1, 16);
    ui.separator();
    ui.beginGroup();
    const newPath = ui.inputText("Script relative root", this._rootPath);
    if (newPath != null) {
      this._rootPath = newPath;
    }
    if (ui.button("Update Paths")) {
      this._updatePaths();
    }
    ui.endGroup();
  }
  _updatePaths() {
    data.settings.scripting.sourcePaths;
  }
};
export {
  UpdatePaths as default
};
