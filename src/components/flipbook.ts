import {WonderlandEngine, Component, Texture, Material, MeshComponent } from "@wonderlandengine/api";
import { property } from "@wonderlandengine/api/decorators.js";

class DynamicTextureCache {
  
  textures: any;
  engine: WonderlandEngine;

  constructor(engine: WonderlandEngine) {
    this.textures = {};
    this.engine = engine;
  }

  loadTextures(url:string, columns:number, rows:number) {
    if (!this.textures.hasOwnProperty(url)) {
      this.textures[url] = new Promise((resolve, reject) => {
        let image = new Image();
        let textures:Texture[] = [];
        image.src = url;
        image.onload = () => {
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          if(context == null) reject("Could not get context");
          canvas.width = image.width;
          canvas.height = image.height;
          context!.drawImage(image, 0, 0);
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

  copyPartOfCanvas(canvas:CanvasImageSource, x:number, y:number, width:number, height:number) {
    let copy = document.createElement("canvas");
    copy.width = width;
    copy.height = height;
    let ctx2 = copy.getContext("2d");
    ctx2!.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    return copy;
  }
}

let textureCache:DynamicTextureCache;

interface FlatMaterial extends Material {
  flatTexture: Texture;
  emissiveTexture: Texture;
}

export class Flipbook extends Component {
  static TypeName = "flipbook";

  @property.material()
  base!: Material;

  @property.string("")
  url: string = "";

  @property.string("")
  urlEmissive: string = "";

  @property.int(4)
  columns: number = 4;

  @property.int(4)
  rows: number = 4;

  @property.float(8.0)
  speed: number = 8.0;

  textures: Material[] = [];

  loaded: boolean = false;

  index: number = 0;

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

  createMaterial(base:Material, texture:Texture, emissiveTexture:Texture|null = null) {
    const mat = base.clone();
    if(!mat) throw new Error("Could not clone material");
    if (mat.pipeline == "Flat Opaque Textured" 
      || mat.pipeline.startsWith("FlatSorskoot")) {
      const flatMat = mat as FlatMaterial;
      flatMat.flatTexture = texture;
      if (mat.pipeline == "FlatSorskoot Emissive") {
        flatMat.flatTexture = texture;
        if (emissiveTexture) {
          flatMat.emissiveTexture = emissiveTexture;
        }
      }
    } else {
      console.error(`Pipeline ${mat.pipeline} not supported by flipbook`);
    }
    return mat;
  }
  
  mat: MeshComponent|null = null;
  t: number = 0;

  start() {
    this.mat = this.object.getComponent(MeshComponent);
    this.t = Math.random() * this.speed;
  }
  
  previousIndex: number = -1;

  update(dt:number) {
    if (!this.loaded) return;
    this.t += dt * this.speed;
    this.index = ~~this.t % this.textures.length;
    if (
      this.textures &&
      this.textures.length &&
      this.previousIndex != this.index &&
      this.mat
    ) {
      this.previousIndex = this.index;
      this.mat.material = this.textures[this.index];
    }
  }
}
