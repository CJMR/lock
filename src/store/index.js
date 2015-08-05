import atom from '../atom/index';
import { Map } from 'immutable';

const store = atom(new Map({}));

export function subscribe(key, f) {
  store.addWatch(key, f);
}

export function swap(...args) {
  return store.swap(...args);
}

export function updateEntity(state, coll, id, f, ...args) {
  return state.updateIn([coll, id], new Map({}), x => f(x, ...args));
}

export function setEntity(state, coll, id, m) {
  return state.setIn([coll, id], m);
}

export function read(f, ...args) {
  return f(store.deref(), ...args);
}

export function getEntity(state, coll, id) {
  return state.getIn([coll, id]);
}

export function getCollection(state, coll) {
  return state.get(coll);
}

// function updateCollection(coll, f, ...args) {
//   store.swap(state => state.update(coll, xs => f(xs, ...args)));
// }
//
// function updateFilteredCollection(coll, pred, f, ...args) {
//   updateCollection(coll, xs => xs.merge(xs.filter(pred).map(x => f(x, ...args))));
// }

export function getState() {
  return store.deref();
}

// DEV
// store.addWatch("keepHistory", (key, oldState, newState) => {
//   if (!global.window.h) global.window.h = []; global.window.h.push(newState);
//   console.debug("something changed", newState.toJS());
// });