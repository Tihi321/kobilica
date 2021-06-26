import { CAMERA_POSITION_KEYS, Events } from "../constants";

export const sendCameraPostionOne = (element: HTMLElement) => {
  const event = new CustomEvent(Events.CameraPosition, {
    detail: CAMERA_POSITION_KEYS.ONE,
  });
  element.dispatchEvent(event);
};

export const sendCameraPostionTwo = (element: HTMLElement) => {
  const event = new CustomEvent(Events.CameraPosition, {
    detail: CAMERA_POSITION_KEYS.TWO,
  });
  element.dispatchEvent(event);
};

export const sendCameraPostionThree = (element: HTMLElement) => {
  const event = new CustomEvent(Events.CameraPosition, {
    detail: CAMERA_POSITION_KEYS.THREE,
  });
  element.dispatchEvent(event);
};

export const sendCameraForward = (element: HTMLElement) => {
  const event = new CustomEvent(Events.CameraForward);
  element.dispatchEvent(event);
};

export const sendCameraBackward = (element: HTMLElement) => {
  const event = new CustomEvent(Events.CameraBackward);
  element.dispatchEvent(event);
};