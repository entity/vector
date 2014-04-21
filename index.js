
/*!
 *
 * vector
 *
 * MIT licensed.
 *
 */

/**
 * Module dependencies.
 */

var merge = require('merge');

/**
 * Expose `Vector`.
 */

module.exports = Vector;

/**
 * Vector.
 *
 * @param {Number|Vector} x
 * @param {Number} [y]
 * @api public
 */

function Vector(x, y){
  if (!(this instanceof Vector)) return new Vector(x, y);
  this.x = 0;
  this.y = 0;
  this.set(x, y);
}

/**
 * Proto.
 */

var V = {};

/**
 * Set Vector elements.
 *
 * @param {Number|Vector} x
 * @param {Number} [y]
 * @return {Vector} this
 */

V.set = function(x, y){
  if (x instanceof Vector) {
    this.x = x.x;
    this.y = x.y;
  }
  else {
    if (null == y) {
      this.y = this.x = x || 0;
    }
    else {
      this.x = x;
      this.y = y;
    }
  }
  return this;
};

/**
 * Add A + B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.add = function(v){
  return new Vector(
    this.x + v.x,
    this.y + v.y
  );
};

/**
 * Add A += B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.madd = function(v){
  this.x += v.x;
  this.y += v.y;
  return this;
};

/**
 * Subtract A - B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.sub = function(v){
  return new Vector(
    this.x - v.x,
    this.y - v.y
  );
};

/**
 * Subtract A -= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.msub = function(v){
  this.x -= v.x;
  this.y -= v.y;
  return this;
};

/**
 * Multiply A * B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.mul = function(v){
  return new Vector(
    this.x * v.x,
    this.y * v.y
  );
};

/**
 * Multiply A *= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.mmul = function(v){
  this.x *= v.x;
  this.y *= v.y;
  return this;
};

/**
 * Divide A / B.
 *
 * @param {Vector} v
 * @return {Vector}
 * @api public
 */

V.div = function(v){
  return new Vector(
    this.x / v.x,
    this.y / v.y
  );
};

/**
 * Divide A /= B.
 *
 * @param {Vector} v
 * @return {Vector} this
 * @api public
 */

V.mdiv = function(v){
  this.x /= v.x;
  this.y /= v.y;
  return this;
};

/**
 * Clone.
 *
 * @return {Vector}
 * @api public
 */

V.clone = function(){
  return new Vector(this);
};

/**
 * Copy elements to `v`.
 *
 * @param {Vector} v
 * @return {Vector} v
 */

V.copyTo = function(v){
  v.x = this.x;
  v.y = this.y;
  return v;
};

/**
 * Dot product.
 *
 * @param {Vector} [v]
 * @return {Number}
 * @api public
 */

V.dot = function(v){
  v = v || this;
  return this.x*v.x + this.y*v.y;
};

/**
 * Cross product.
 *
 * @param {Vector} v
 * @return {Number}
 * @api public
 */

V.cross = function(v){
  return this.x*v.y - this.y*v.x;
};

/**
 * Magnitude.
 *
 * @return {Number}
 * @api public
 */

V.mag = function(){
  return Math.sqrt(this.dot());
};

/**
 * Normalize.
 *
 * @return {Vector}
 * @api public
 */

V.normalize = function(){
  return this.div(new Vector(this.mag()));
};

/**
 * Distance.
 *
 * @param {Vector} v
 * @return {Number}
 * @api public
 */

V.distance = function(v){
  return v.sub(this).mag();
};

/**
 * Angle in radians.
 *
 * @return {Number}
 * @api public
 */

V.radians = function(){
  return Math.atan2(this.y, this.x);
};

/**
 * Angle in degress.
 *
 * @return {Number}
 * @api public
 */

V.angle = function(){
  return this.radians() * (180 / Math.PI);
};

/**
 * Scale.
 *
 * @param {Number} scale
 * @return {Vector}
 */

V.scale = function(scale){
  var mag = this.mag();
  return new Vector(
    this.x * scale / mag,
    this.y * scale / mag
  );
};

/**
 * Perp.
 * 
 * @return {Vector}
 * @api public
 */

V.perp = function(){
  return new Vector(this.x, -this.y);
};

/**
 * Absolute.
 *
 * @return {Vector}
 * @api public
 */

V.abs = function(){
  return new Vector(
    Math.abs(this.x),
    Math.abs(this.y)
  );
};

/**
 * Negate.
 *
 * @return {Vector}
 * @api public
 */

V.neg = function(){
  return new Vector(
    -this.x,
    -this.y
  );
};

/**
 * Interpolate.
 *
 * @param {Vector} v
 * @param {Number} a
 * @return {Vector}
 * @api public
 */

V.lerp = function(v, a){
  return this.add(v.sub(this).mul(new Vector(a)));
};

/**
 * Examine if vectors are equal.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.equals = function(v){
  return (
    this.x === v.x &&
    this.y === v.y
  );
};

/**
 * Examine if A < B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.lt = function(v){
  return this.mag() < v.mag();
};

/**
 * Examine if A <= B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.lte = function(v){
  return this.mag() <= v.mag();
};

/**
 * Examine if A > B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.gt = function(v){
  return this.mag() > v.mag();
};

/**
 * Examine if A >= B.
 *
 * @param {Vector} v
 * @return {Boolean}
 * @api public
 */

V.gte = function(v){
  return this.mag() >= v.mag();
};

/**
 * Cast to string.
 *
 * @return {String}
 * @api public
 */

V.toString = function(){
  return this.x + ',' + this.y;
};

/**
 * Cast to fixed decimal points string.
 *
 * @return {String}
 * @api public
 */

V.toFixed = function(d){
  return this.x.toFixed(d) + ',' + this.y.toFixed(d);
};

/**
 * Insert methods to `Vector.prototype`.
 */

merge(Vector.prototype, V);
