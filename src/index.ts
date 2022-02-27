import combineSimilarKeysDeep from './combineSimilarKeys';
import { SwitchBoardPlugins } from './types';
import { destResolverSwitch } from './utils';

function mapper<Input, Output>(
  input: Input,
  map: { [key: string]: any },
  plugins?: SwitchBoardPlugins
) {
  let output = {};
  Object.entries(map).forEach((entry) => {
    output = destResolverSwitch(entry, input, output);
  });

  return combineSimilarKeysDeep(output) as Output;
}

export default mapper