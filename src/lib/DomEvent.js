const on = function () {

};

export default {
  on,
};

/*export function on(obj, types, fn, context) {

  if (typeof types === 'object') {
    for (var type in types) {
      addOne(obj, type, types[type], fn);
    }
  } else {
    types = Util.splitWords(types);

    for (var i = 0, len = types.length; i < len; i++) {
      addOne(obj, types[i], fn, context);
    }
  }

  return this;
}*/
