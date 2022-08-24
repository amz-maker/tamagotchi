export interface IVector2 {
  x: number;
  y: number;
}

export interface IEvents {
  key: { [code: string]: boolean };
  mouse: {
    left: boolean;
    right: boolean;
  };
}
