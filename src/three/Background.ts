import * as dat from "dat.gui";
import { Events, CAMERA_POSITIONS, CAMERA_POSITION_KEYS } from "../constants";
import {
  normalizeXCoordinate,
  normalizeYCoordinate,
  getMeshCount,
  generateRandomVerticesArray,
  world,
  generatePlaneGeometry,
  randomizePlaneVertices,
  generateColors,
  animatePlaneVertices,
  animateMouseOverVerticesColors,
  animateCameraPostion,
} from "../utils/index";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshPhongMaterial,
  Mesh,
  DirectionalLight,
  AmbientLight,
  Raycaster,
  DoubleSide,
  FlatShading,
  BufferGeometry,
  PointsMaterial,
  Points,
  Float32BufferAttribute,
  Vector2,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import type { TMouse, TPostition } from "../types";

export class Background {
  private showGui: boolean = false;
  private frame: number = 0;
  private cameraCustom: boolean = false;
  private cameraPosition: string = CAMERA_POSITIONS[0];
  private mouse: TMouse = {
    x: undefined,
    y: undefined,
  };

  private appElement: HTMLElement;
  private elementWidth: number;
  private elementHeight: number;
  private renderer: WebGLRenderer;
  private composer: EffectComposer;
  private raycaster: Raycaster;
  private camera: PerspectiveCamera;
  private scene: Scene;
  private sea: Mesh;
  private stars: Points;
  private directionalLight: DirectionalLight;
  private ambientLight: AmbientLight;

  constructor(canvasElement: HTMLElement, showGui = false) {
    this.appElement = canvasElement;
    this.showGui = showGui;

    this.elementWidth = this.appElement.getBoundingClientRect().width;
    this.elementHeight = this.appElement.getBoundingClientRect().height;
  }

  init = () => {
    this.addRenderer();
    this.addComposer();
    this.addRaycaster();
    this.addScene();
    this.addCamera();
    this.setCameraPositionRotation();
    this.addPostProcessing();
    this.addStarsMesh();
    this.addSeaMesh();
    this.addDirectionalLight();
    this.addAmbientLight();
    this.addOnResize();
    this.addOnMouseMove();
    this.addCameraPositionEventListeners();

    if (this.showGui) {
      this.addGUI();
    }
  };

  addGUI = () => {
    this.cameraCustom = true;
    const gui = new dat.GUI();

    gui
      .add(world.camera, "positionx", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.camera, "positiony", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.camera, "positionz", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.camera, "rotationx", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.camera, "rotationy", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.camera, "rotationz", -50, 50)
      .onChange(this.setCameraPositionRotation);
    gui
      .add(world.light, "lpositionx", 0, 1)
      .onChange(this.setDirectionalLightPosition);
    gui
      .add(world.light, "lpositiony", 0, 1)
      .onChange(this.setDirectionalLightPosition);
    gui
      .add(world.light, "lpositionz", 0, 1)
      .onChange(this.setDirectionalLightPosition);
    gui
      .add(world.light, "intensity", 0, 1)
      .onChange(this.setDirectionalLightInensitiy);
    gui
      .add(world.ambientLight, "aintensity", 0, 1)
      .onChange(this.setAmbientLightInensitiy);
    gui.add(world.sea, "width", 1, 30).onChange(this.generateNewPlaneGeometry);
    gui.add(world.sea, "height", 1, 30).onChange(this.generateNewPlaneGeometry);
    gui
      .add(world.sea, "widthS", 0, 100)
      .onChange(this.generateNewPlaneGeometry);
    gui
      .add(world.sea, "heightS", 0, 100)
      .onChange(this.generateNewPlaneGeometry);
  };

  addRenderer = () => {
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.elementWidth, this.elementHeight);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.appElement.appendChild(this.renderer.domElement);
  };

  addComposer = () => {
    this.composer = new EffectComposer(this.renderer);
  };

  addScene = () => {
    this.scene = new Scene();
    this.scene.background = null;
  };

  addRaycaster = () => {
    this.raycaster = new Raycaster();
  };

  addCamera = () => {
    this.camera = new PerspectiveCamera(
      75,
      this.elementWidth / this.elementHeight
    );
  };

  setCameraPositionRotation = () => {
    this.camera.position.x = world.camera.positionx;
    this.camera.position.y = world.camera.positiony;
    this.camera.position.z = world.camera.positionz;
    this.camera.rotation.x = world.camera.rotationx;
    this.camera.rotation.y = world.camera.rotationy;
    this.camera.rotation.z = world.camera.rotationz;
  };

  addPostProcessing = () => {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    const unrealBloomPass = new UnrealBloomPass(new Vector2(5), 0.3, 5, 0.4);
    this.composer.addPass(unrealBloomPass);

    const filmPass = new FilmPass(0.4, 0.3, 20, 0);
    filmPass.renderToScreen = true;
    this.composer.addPass(filmPass);
  };

  addSeaMesh = () => {
    const seaGeometry = generatePlaneGeometry(world);
    const seaMaterial = new MeshPhongMaterial({
      side: DoubleSide,
      flatShading: FlatShading as unknown as boolean,
      vertexColors: true,
    });
    this.sea = new Mesh(seaGeometry, seaMaterial);

    this.scene.add(this.sea);

    this.sea.geometry.setAttribute(
      "color",
      generateColors(getMeshCount(this.sea))
    );

    randomizePlaneVertices(this.sea);
  };

  addStarsMesh = () => {
    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({
      color: 0xffff00,
    });
    const startVertices = generateRandomVerticesArray(1000);
    starGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(startVertices, 3)
    );

    this.stars = new Points(starGeometry, starMaterial);

    this.stars.geometry.scale(0.09, 0.09, 0.09);

    this.scene.add(this.stars);
  };

  addDirectionalLight = () => {
    this.directionalLight = new DirectionalLight(
      0xffffff,
      world.light.intensity
    );

    this.setDirectionalLightPosition();
    this.scene.add(this.directionalLight);
  };

  addAmbientLight = () => {
    this.ambientLight = new AmbientLight(
      0xffffff,
      world.ambientLight.aintensity
    );
    this.scene.add(this.ambientLight);
  };

  setDirectionalLightPosition = () => {
    this.directionalLight.position.set(
      world.light.lpositionx,
      world.light.lpositiony,
      world.light.lpositionz
    );
  };

  setDirectionalLightInensitiy = () => {
    this.directionalLight.intensity = world.light.intensity;
  };

  setAmbientLightInensitiy = () => {
    this.ambientLight.intensity = world.ambientLight.aintensity;
  };

  generateNewPlaneGeometry = () => {
    this.sea.geometry.dispose();
    this.sea.geometry = generatePlaneGeometry(world);
    randomizePlaneVertices(this.sea);
    this.sea.geometry.setAttribute(
      "color",
      generateColors(getMeshCount(this.sea))
    );
  };

  addOnResize = () => {
    window.addEventListener("resize", () => {
      const { width, height } = this.appElement.getBoundingClientRect();
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.generateNewPlaneGeometry();
    });
  };

  addOnMouseMove = () => {
    addEventListener("mousemove", (event) => {
      this.mouse.x = normalizeXCoordinate(event.clientX, this.elementWidth);
      this.mouse.y = normalizeYCoordinate(event.clientY, this.elementHeight);
    });
  };

  setCameraPositionOne = () => {
    this.cameraPosition = CAMERA_POSITIONS[0];
  }

  setCameraPositionTwo = () => {
    this.cameraPosition = CAMERA_POSITIONS[1];
  }

  setCameraPositionThree = () => {
    this.cameraPosition = CAMERA_POSITIONS[2];
  }

  onCameraPostion = (event: CustomEvent) => {
    switch (event.detail) {
      case CAMERA_POSITION_KEYS.ONE:
        this.cameraPosition = CAMERA_POSITION_KEYS.ONE;
        break;
      case CAMERA_POSITION_KEYS.TWO:
        this.cameraPosition = CAMERA_POSITION_KEYS.TWO;
        break;
      case CAMERA_POSITION_KEYS.THREE:
        this.cameraPosition = CAMERA_POSITION_KEYS.THREE;
        break;
    
      default:
        break;
    }
  };

  onCameraPositionForward = () => {
    const index = CAMERA_POSITIONS.indexOf(this.cameraPosition);
    this.cameraPosition =
      index >= CAMERA_POSITIONS.length - 1
        ? CAMERA_POSITIONS[0]
        : CAMERA_POSITIONS[index + 1];
  };

  onCameraPositionBackward = () => {
    const index = CAMERA_POSITIONS.indexOf(this.cameraPosition);
    this.cameraPosition =
      index === 0
        ? CAMERA_POSITIONS[CAMERA_POSITIONS.length - 1]
        : CAMERA_POSITIONS[index - 1];
  };

  addCameraPositionEventListeners = () => {
    this.appElement.addEventListener(
      Events.CameraBackward,
      this.onCameraPositionBackward
    );
    this.appElement.addEventListener(
      Events.CameraForward,
      this.onCameraPositionForward
    );
    this.appElement.addEventListener(
      Events.CameraPosition,
      this.onCameraPostion
    );
  };

  animate = () => {
    this.frame = this.frame <= 360 ? this.frame + 0.01 : 0;
    this.composer.render();
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersectPlane = this.raycaster.intersectObject(this.sea);

    const position: TPostition = {
      x: this.cameraCustom
        ? world.camera.positionx
        : world.camera.position[this.cameraPosition].x,
      y: this.cameraCustom
        ? world.camera.positiony
        : world.camera.position[this.cameraPosition].y,
      z: this.cameraCustom
        ? world.camera.positionz
        : world.camera.position[this.cameraPosition].z,
    };

    this.stars.rotation.z += 0.0001;
    this.stars.rotation.y += 0.0001;

    animateCameraPostion(this.camera, position);
    animatePlaneVertices(this.sea, this.frame);
    animateMouseOverVerticesColors(intersectPlane);
  };
}
