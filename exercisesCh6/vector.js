class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }
  minus(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}

const vec1 = new Vector(1, 1);
const vec2 = new Vector(1, 1);

const vec3 = vec1.plus(vec2);
const vec4 = vec1.minus(vec2);

const vec1Length = vec1.length;
