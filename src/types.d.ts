export type SwitchBoardPlugin = {
  [key: string]: {
    type?: 'getter' | 'transformer',
    method: (value: any, source?: any) => any | ((source: any) => any)
  } | ((value: any, source?: any) => any)
}

export type SwitchBoardPlugins = {
  includeIf?: (value: any, source?: any) => boolean;
  transform?: (value: any, source?: any) => any;
  getter?: (source: any) => any;
  mergeStrategy?: (target: any, ...sources: any[]) => any;
  allowNull?: boolean;
  includeSource?: boolean;
  plugins: SwitchBoardPlugin
};

export type SwitchBoardParams = {
  plugins: SwitchBoardPlugins;
  map: { [key: string]: string };
};

export type DestinationObject = {
  includeIf?: (value: any, source?: any) => boolean;
  transform?: (value: any, source?: any) => any;
  getter?: (source: any) => any;
  mergeStrategy?: (target: any, ...sources: any[]) => any;
  key: string | Array<any>;
};
