import { PlaneGeometry, BufferAttribute, Camera } from "three";
import { tween } from "shifty";
import {
  getZIndex,
  getXIndex,
  loopMeshGeometry,
  rangeReduce,
  getYIndex,
} from "./objects";
import {
  ColorOceanBlue,
  CAMERA_POSITION_KEYS,
  ColorLightBlue,
} from "../constants";
import type { TPostition } from "../types";

export const world = {
  sea: {
    width: 20,
    height: 20,
    widthS: 60,
    heightS: 60,
  },
  light: {
    lpositionx: 0.1,
    lpositiony: 0.3,
    lpositionz: 0.16,
    intensity: 0.76,
  },
  ambientLight: {
    aintensity: 0.8,
  },
  camera: {
    position: {
      [CAMERA_POSITION_KEYS.ONE]: {
        x: -3.6,
        y: -9,
        z: 1.6,
      },
      [CAMERA_POSITION_KEYS.TWO]: {
        x: -6.1,
        y: 3.1,
        z: 1.75,
      },
      [CAMERA_POSITION_KEYS.THREE]: {
        x: 0,
        y: 2.6,
        z: 1.6,
      },
    },
    positionx: -3.6,
    positiony: -9,
    positionz: 0.63,
    rotationx: 1.24,
    rotationy: -0.53,
    rotationz: 6,
  },
};

export const generatePlaneGeometry = (worldObj: typeof world) =>
  new PlaneGeometry(
    worldObj.sea.width,
    worldObj.sea.height,
    worldObj.sea.widthS,
    worldObj.sea.heightS
  );

export const randomizePlaneVertices = (planeElement: any) => {
  const { array: planeArray } = planeElement.geometry.attributes.position;
  let randomValues = [];
  loopMeshGeometry(planeElement, ({ index, z, x, y }) => {
    planeArray[getXIndex(index)] = x + (Math.random() - 0.5) * 0.3;
    planeArray[getYIndex(index)] = y + (Math.random() - 0.5) * 0.3;
    planeArray[getZIndex(index)] = z + Math.random() * 0.3;

    randomValues.push(Math.random(), Math.random(), Math.random());
  });

  planeElement.geometry.attributes.position.originalPosition = planeArray;
  planeElement.geometry.attributes.position.randomValues = randomValues;
};

export const animatePlaneVertices = (planeElement: any, frame: number) => {
  const {
    array: planeArray,
    originalPosition,
    randomValues,
  } = planeElement.geometry.attributes.position;
  loopMeshGeometry(planeElement, ({ index }) => {
    planeArray[getXIndex(index)] =
      originalPosition[getXIndex(index)] +
      Math.cos(frame + randomValues[index]) * 0.003;
    planeArray[getYIndex(index)] =
      originalPosition[getYIndex(index)] +
      Math.sin(frame + randomValues[index + 1]) * 0.001;
    planeArray[getZIndex(index)] =
      originalPosition[getZIndex(index)] +
      Math.sin(frame + randomValues[index + 2]) * 0.001;
  });

  planeElement.geometry.attributes.position.needsUpdate = true;
};

export const animateMouseOverVerticesColors = (intersectPlane: any) => {
  if (intersectPlane.length > 0) {
    const { a, c } = intersectPlane[0].face;
    const { color } = intersectPlane[0].object.geometry.attributes;

    tween({
      from: {
        r: ColorLightBlue.R,
        g: ColorLightBlue.G,
        b: ColorLightBlue.B,
      },
      to: {
        r: ColorOceanBlue.R,
        g: ColorOceanBlue.G,
        b: ColorOceanBlue.B,
      },
      duration: 1500,
      easing: "easeOutQuad",
      render: ({ r, g, b }) => {
        [a, b, c].forEach((face) => {
          color.setX(face, r);
          color.setY(face, g);
          color.setZ(face, b);
        });

        color.needsUpdate = true;
      },
    });
  }
};

export const animateCameraPostion = (camera: Camera, position: TPostition) => {
  if (
    camera.position.x !== position.x ||
    camera.position.y !== position.y ||
    camera.position.z === position.z
  ) {
    tween({
      from: {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      },
      to: {
        x: position.x,
        y: position.y,
        z: position.z,
      },
      duration: 1000,
      easing: "easeOutQuad",
      render: ({ x, y, z }) => {
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
      },
    });
  }
};

export const generateColors = (count: number) =>
  new BufferAttribute(
    new Float32Array(
      rangeReduce(count, (acc) => [...acc, ColorOceanBlue.R, ColorOceanBlue.G, ColorOceanBlue.B], [])
    ),
    3
  );
