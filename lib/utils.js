const Util = {
  inherits(childClass, parentClass) {
    function Surrogate () { this.constructor = childClass; }
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
  }
};

module.exports = Util;
