const Util = {
  inherits(childClass, parentClass) {
    function Surrogate () { this.constructor = childClass; }
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  },

  dist (pos1, pos2) {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
},
};

module.exports = Util;
