import { Flipbook, Tags } from "../index.js";
import { ObjectCache } from "./ObjectCache.js";
import {
  Object3D,
  WonderlandEngine,
  MeshComponent,
  CollisionComponent,
  AnimationComponent
} from "@wonderlandengine/api";

/**
  * @description clones the passed object
   @param {WonderlandEngine} engine - the engine
  * @param {Object3D} object - the object to clone
  * @param {ObjectCache} cache an optional cache to use for cloning
  * @returns {Object3D} the cloned object
  */
export function cloneObject(
  engine: WonderlandEngine,
  object: Object3D,
  cache: ObjectCache
): Object3D | undefined {
  if (!object || !object.parent) {
    console.log("can't clone undefined object");
    return;
  }

  /**
   * @type {Object3D} the object that is cloned
   */
  let cloned;

  if (cache) {
    cloned = cache.getItem();
  }

  if (!cloned) {
    console.error("no cache available, cloning object");
    cloned = engine.scene.addObject(object.parent);
  }

  let components = object.getComponents();
  const comp = cloned.getComponents();
  for (let i = 0; i < components.length; i++) {
    if (components[i].type == "mesh") {
      const m = comp.find(
        (c) => c.type == "mesh" && c.active == false
      ) as MeshComponent;
      const original = components[i] as MeshComponent;
      if (m) {
        m.mesh = original.mesh;
        m.material = original.material;
        m.skin = original.skin;
        m.active = true;
      } else {
        cloned.addComponent("mesh", {
          mesh: original.mesh,
          material: original.material,
          skin: original.skin,
        });
      }
    } else if (components[i].type == "collision") {
      const c = comp.find(
        (c) => c.type == "collision" && c.active == false
      ) as CollisionComponent;
      const original = components[i] as CollisionComponent;
      if (c) {
        c.collider = original.collider;
        c.extents = original.extents;
        c.group = original.group;
        c.active = true;
      } else {
        cloned.addComponent("collision", {
          collider: original.collider,
          extents: original.extents,
          group: original.group,
        });
      }
    } else if (components[i].type == "animation") {
      const c = comp.find(
        (c) => c.type == "animation" && c.active == false
      ) as AnimationComponent;
      const original = components[i] as AnimationComponent;
      if (c) {
        c.animation = original.animation;
        c.playCount = original.playCount;
        c.active = true;
      } else
        cloned.addComponent("animation", {
          animation: original.animation,
          playCount: original.playCount,
        });
    } else if (components[i].type == "tags") {
      const c = comp.find((c) => c.type == "tags" && c.active == false) as Tags;
      const original = components[i] as Tags;
      if (c) {
        c.tags = original.tags;
        c.active = true;
      } else
        cloned.addComponent(Tags, {
          tags: original.tags,
        });
    } else if (components[i].type == "flipbook") {
      const c = comp.find((c) => c.type == "flipbook" && c.active == false) as Flipbook;
      const original = components[i] as Flipbook;
      if (c) {
        c.base = original.base;
        c.url = original.url;
        c.urlEmissive = original.urlEmissive;
        c.columns = original.columns;
        c.rows = original.rows;
        c.speed = original.speed;
        c.active = true;
      } else
        cloned.addComponent(Flipbook, {
          base: original.base,
          url: original.url,
          urlEmissive: original.urlEmissive,
          columns: original.columns,
          rows: original.rows,
          speed: original.speed,
        });
    } else {
      const c = comp.find(
        (c) => c.type == components[i].type && c.active == false
      );
      if (c) {
        c.active = true;
      } else {
        cloned.addComponent(components[i].type, components[i]);
      }
      // var c = JSON.parse(JSON.stringify(components[i]))
      // delete(c,'_id');
      // delete(c,'_manager');
      // delete(c,'_type');
      // cloned.addComponent(components[i].type, c);
    }
  }
  let pos:any[] = [];
  let rot:any[] = [];
  let scale:any[] = [];
  object.getPositionLocal(pos);
  object.getRotationLocal(rot);
  object.getScalingLocal(scale);
  cloned.resetPositionRotation();
  cloned.setPositionLocal(pos);
  cloned.setRotationLocal(rot);
  cloned.setScalingLocal(scale);

  cloned.name = object.name;
  if (object.children.length > 0) {
    for (let i = 0; i < object.children.length; i++) {
      let childClone = cloneObject(engine, object.children[i], cache);
      childClone!.parent = cloned;
    }
  }
  cloned.setDirty();
  return cloned;
}

/**
 * Finds a child object by name
 * @param {Object3D} object Object to get the child from
 * @param {string} childName The name of the child to find
 * @returns {Object3D} The child object; or undefined if not found
 */
function findChild(object: Object3D, childName: string): Object3D {
  return object.children.filter((o) => o.name == childName)[0];
}

/**
 * Replaces a string inside another string by index
 * @param {String} string original string to replace a character in
 * @param {Number} index the position of the start of replacement
 * @param {String} replacement the replacement string
 * @returns
 */
function replaceAt(string: string, index: number, replacement: string) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}

export const wlUtils = {
  cloneObject,
  findChild,
  replaceAt,
};
