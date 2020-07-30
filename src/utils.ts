import defaultConfig from '../default-config.json';
import userConfig from '../config.json';

import { Config } from './types';

export function loadDefaultConfig(): Config {
  return defaultConfig;
}

export function loadMergedConfig(): Config {
  const defaultConfig = loadDefaultConfig();
  return deepMerge(defaultConfig, userConfig);
}

type SubObject = {[key: string]: any} & Object;
export function deepMerge<T extends SubObject>(defaultObj: T, partialObj: SubObject): T {
  const newObj = {...defaultObj};

  return deepMergeInPlace(newObj, partialObj);
}

export function deepMergeInPlace<T extends SubObject>(inPlaceObj: T, partialObj: SubObject): T {
  for (let key of Object.keys(partialObj)) {
    if (inPlaceObj.hasOwnProperty(key) && isObject(inPlaceObj[key])) {
      deepMergeInPlace(inPlaceObj[key], partialObj[key]!);
    } else {
      (inPlaceObj[key] as any) = partialObj[key];
    }
  }

  return inPlaceObj;
}

function isObject(arg: any): arg is Object {
  return arg && typeof(arg) === 'object' && !!!arg.length;
}