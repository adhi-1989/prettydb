import clamp from "lodash/clamp";
import cloneDeep from "lodash/cloneDeep";
import filter from "lodash/filter";
import find from "lodash/find";
import groupBy from "lodash/groupBy";
import has from "lodash/has";
import isFunction from "lodash/isFunction";
import isMatch from "lodash/isMatch";
import isNumber from "lodash/isNumber";
import matches from "lodash/matches";
import memoize from "lodash/memoize";
import random from "lodash/random";
import range from "lodash/range";
import remove from "lodash/remove";
import some from "lodash/some";
import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";

export {
  clamp,
  cloneDeep,
  filter,
  find,
  groupBy,
  has,
  isFunction,
  isMatch,
  isNumber,
  matches,
  memoize,
  random,
  range,
  remove,
  some,
  sortBy,
  uniq,
};

const _ = {
  clamp,
  cloneDeep,
  filter,
  find,
  groupBy,
  has,
  isFunction,
  isMatch,
  isNumber,
  matches,
  memoize,
  random,
  range,
  remove,
  some,
  sortBy,
  uniq,
} as const;

export default _;
