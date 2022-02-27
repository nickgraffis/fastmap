export type SwitchBoardPlugins = {
  mergeResolver: (target: any, ...sources: any[]) => any;
  getValueResolver: (input: any, value: string) => any;
  createObjectResolver: (key: string, value?: any) => any;
  additionalResolvers: ((output: any) => any)[];
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
