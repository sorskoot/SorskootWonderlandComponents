import { Component, Property, Texture } from "@wonderlandengine/api";

class DynamicTextureCache {
  constructor(engine) {
    this.textures = {};
    this.engine = engine;
  }
  loadTextures(url, columns, rows) {
    if (!this.textures.hasOwnProperty(url)) {
      this.textures[url] = new Promise((resolve, reject) => {
        let image = new Image();
        let textures = [];
        image.src = url;
        image.onload = () => {
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          let spriteWidth = image.width / columns;
          let spriteHeight = image.height / rows;

          for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
              let pc = this.copyPartOfCanvas(
                canvas,
                x * spriteWidth,
                y * spriteHeight,
                spriteWidth,
                spriteHeight
              );
              let texturePc = new Texture(this.engine, pc);
              textures.push(texturePc);
            }
          }
          resolve(textures);
        };
      });
    }
    return this.textures[url];
  }

  copyPartOfCanvas(canvas, x, y, width, height) {
    let copy = document.createElement("canvas");
    copy.width = width;
    copy.height = height;
    let ctx2 = copy.getContext("2d");
    ctx2.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    return copy;
  }
}
/**
 * @type {DynamicTextureCache}
 */
let textureCache;

export class Flipbook extends Component {
  static TypeName = "flipbook";
  static Properties = {
    base: Property.material(),
    url: Property.string(""),
    urlEmissive: Property.string(""),
    columns: Property.int(4),
    rows: Property.int(4),
    speed: Property.float(8.0),
  };

  init() {
    if(!textureCache) {
      textureCache = new DynamicTextureCache(this.engine);
    }
    let texturesPromises = [];

    texturesPromises.push(
      textureCache.loadTextures(this.url, this.columns, this.rows)
    );
    if (this.urlEmissive) {
      texturesPromises.push(
        textureCache.loadTextures(this.urlEmissive, this.columns, this.rows)
      );
    }

    Promise.all(texturesPromises).then((tex) => {
      this.textures = [];

      if (this.urlEmissive) {
        for (let i = 0; i < tex[0].length; i++) {
          this.textures.push(
            this.createMaterial(this.base, tex[0][i], tex[1][i])
          );
        }
      } else {
        for (let i = 0; i < tex[0].length; i++) {
          this.textures.push(this.createMaterial(this.base, tex[0][i]));
        }
      }

      this.loaded = true;
      this.index = Math.floor(Math.random() * this.textures.length);
    });
  }

  createMaterial(base, texture, emissiveTexture) {
    let mat = base.clone();
    if (mat.shader == "Flat Opaque Textured") {
      mat.flatTexture = texture;
    } else if (
      mat.shader == "FlatSorskoot"
    ) {
      mat.flatTexture = texture;
    } else if (mat.shader == "FlatSorskoot Emissive") {
      mat.flatTexture = texture;
      if (emissiveTexture) {
        mat.emissiveTexture = emissiveTexture;
      }
    } else {
      console.error("Shader", mat.shader, "not supported by flipbook");
    }
    return mat;
  }

  start() {
    this.mat = this.object.getComponent("mesh");
    this.t = Math.random() * this.speed;
  }

  update(dt) {
    if (!this.loaded) return;
    this.t += dt * this.speed;
    this.index = ~~this.t % this.textures.length;
    if (
      this.textures &&
      this.textures.length &&
      this.previousIndex != this.index
    ) {
      this.previousIndex = this.index;
      this.mat.material = this.textures[this.index];
    }
  }
}
