import combineSimilarKeysDeep from './combineSimilarKeys';
import { SwitchBoardPlugins } from './types';
import { destResolverSwitch } from './utils';

export function mapper<Output>(
  input: any,
  map: { [key: string]: any },
  plugins?: SwitchBoardPlugins
) {
  let output = {};
  Object.entries(map).forEach((entry) => {
    output = destResolverSwitch(entry, input, output);
  });

  return combineSimilarKeysDeep(output) as Output;
}