export interface IAppState {
  drawerOpened: boolean;
}

export type SetDrawerAction = {
  type: string;
  payload: boolean;
}
