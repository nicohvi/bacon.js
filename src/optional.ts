interface Option<V> {
  getOrElse(arg: V): V
  get(): V
  filter(f: (V) => boolean): Option<V>
  map<V2>(f: (V) => V2): Option<V2>
  forEach(f: (V) => any): void
  isDefined: boolean
  toArray(): V[]
  inspect(): string
  toString(): string
}

class Some<V> implements Option<V> {
  value: V
  constructor(value: V) {
    this.value = value;
  }
  _isSome = true
  getOrElse(arg: V) { return this.value; }
  get() { return this.value; }
  filter(f: (V) => boolean): Option<V> {
    if (f(this.value) ) {
      return new Some(this.value);
    } else {
      return None;
    }
  }
  map<V2>(f: (V) => V2): Option<V2> {
    return new Some(f(this.value));
  }
  forEach(f: (V) => any): void {
    f(this.value)
  }
  isDefined = true
  toArray() { return [this.value]; }
  inspect() { return "Some(" + this.value + ")"; }
  toString() { return this.inspect(); }
}

const None = {
  _isNone: true,
  getOrElse<V>(value: V): V { return value; },
  get() { throw new Error("None.get()") },
  filter() { return None; },
  map() { return None; },
  forEach() {},
  isDefined: false,
  toArray() { return []; },
  inspect() { return "None"; },
  toString() { return this.inspect(); }
};

function none<T>(): Option<T> { return None }

function toOption<V>(v: V | Option<V>): Option<V> {
  if (v && ((v as any)._isSome || (v as any)._isNone)) {
    return v as any
  } else {
    return new Some(v as any);
  }
};

export { Option, Some, None, none, toOption };
