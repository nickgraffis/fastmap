import dotNotationToObject from './dotNotationToObject';
import getValueFromObject from './getValueFromObject';
import mergeDeep from './mergeDeep';
import { DestinationObject } from './types';

export function destResolverSwitch(
  entry: [string, any],
  input: any,
  output: any
) {
  let [, dest] = entry;
  if (typeof dest === 'object') {
    output = mapObjectOrArray(entry, input, output);
  } else if (typeof dest === 'function') {
    output = mapFunction(entry, input, output);
  } else {
    output = mapString(entry, input, output);
  }

  return output;
}

function mapObjectOrArray(
  [source, dest]: [string, DestinationObject],
  sourceObj: any,
  prevDestObj: any
) {
  if (Array.isArray(dest))
    return mapArray([source, dest], sourceObj, prevDestObj);
  else return mapObject([source, dest], sourceObj, prevDestObj);
}

function mapObject(
  [source, dest]: [string, DestinationObject],
  sourceObj: any,
  prevDestObj: any
) {
  const { includeIf, transform, getter, mergeStrategy, key } = dest;
  let sourceValue;
  let destObject;
  let merge = mergeStrategy || mergeDeep;

  // It is important to note the order of events.
  // 1. The getter will retrieve the value from the source object
  // 2. The transformer will transform that value and then a new
  // object will be created following the dest path
  // 3. The includeIf function will check if there should be a merge
  // at all. If there should:
  // 4. The merge strategy will merge the previous object with this one.

  // Get the value from the source object by the given getter
  // function or by the getValueFromObject function
  if (getter && typeof getter === 'function') sourceValue = getter(sourceObj);
  else sourceValue = getValueFromObject(sourceObj, source);

  // Check if the destination key is a string or any array
  // and turn the destination value into a transformed value
  // if a transform function is given. Then turn the key into
  // an object using dotNotationToObject
  if (typeof key === 'string') {
    if (transform && typeof transform === 'function')
      sourceValue = transform(sourceValue, sourceObj);
    destObject = dotNotationToObject(key, sourceValue);
  } else {
  }

  // If there is an includeIf function then we want to check
  // to see weather or not to merge the previous object into
  // the destination object. Default behavior is to merge
  if (includeIf && typeof includeIf === 'function') {
    return includeIf(sourceValue, sourceObj)
      ? merge(prevDestObj, destObject)
      : prevDestObj;
  } else {
    return merge(prevDestObj, destObject);
  }
}

function mapArray(
  [source, dest]: [string, any[]],
  sourceObj: any,
  prevDestObj: any
) {
  for (let i = 0; i < dest.length; i++) {
    prevDestObj = destResolverSwitch([source, dest[i]], sourceObj, prevDestObj);
  }

  return prevDestObj;
}

function mapFunctionResponseToObject(
  res: { [key: string]: any },
  prevObj: any
) {
  // Get the key and the value from that response
  const [[key, value]] = Object.entries(res);

  // Create the new object
  const destObj = dotNotationToObject(key, value);

  // Merge the new object with the previous
  return mergeDeep(prevObj, destObj);
}

function mapFunction(
  [source, dest]: [
    string,
    (source: string, sourceObj: any) => { [key: string]: any }
  ],
  sourceObj: any,
  prevDestObj: any
) {
  // The dest function here must return an object where the key
  // is the path to the value. ie. { 'nested.path.name' : value }
  // or it must return an array of these objects.
  const destResponse = dest(source, sourceObj);

  // If it is an array of objects that is returned
  if (Array.isArray(destResponse)) {
    for (let i = 0; i < destResponse.length; i++) {
      prevDestObj = mapFunctionResponseToObject(destResponse[i], prevDestObj);
    }
  } else prevDestObj = mapFunctionResponseToObject(destResponse, prevDestObj);

  return prevDestObj;
}

function mapString(
  [source, dest]: [string, any],
  sourceObj: any,
  prevDestObj: any
) {
  return mergeDeep(
    prevDestObj,
    dotNotationToObject(dest, getValueFromObject(sourceObj, source))
  );
}
