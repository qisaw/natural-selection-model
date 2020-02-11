import { DeepSet } from './deep-set';

describe('deep set', () => {
  describe('constructor, size and values', () => {
    it('should create empty set if nothing passed in', () => {
      const set = new DeepSet();
      expect(Array.from(set.values())).toEqual([]);
      expect(set.size).toEqual(0);
    });
    it('should have a set with a number of values', () => {
      const set = new DeepSet([1, 2]);
      expect(Array.from(set.values())).toEqual([1, 2]);
      expect(set.size).toEqual(2);
    });
    it('should remove duplicates', () => {
      const set = new DeepSet([{ a: 1 }, { a: 2 }, { a: 1 }]);
      expect(Array.from(set.values())).toEqual([{ a: 1 }, { a: 2 }]);
      expect(set.size).toEqual(2);
    });
  });
  describe('add', () => {
    it('should return the set', () => {
      const set = new DeepSet();
      const returnValue = set.add(1);
      expect(returnValue).toBe(set);
    });
    it('should add a value to the set', () => {
      const set = new DeepSet();
      set.add(1);
      expect(Array.from(set.values())).toEqual([1]);
    });
    it('should only add an item once', () => {
      const set = new DeepSet();
      set.add(1);
      set.add(1);
      expect(Array.from(set.values())).toEqual([1]);
    });
  });
  describe('has', () => {
    it('should return true if the object is in the set', () => {
      const set = new DeepSet();
      set.add({ x: 1 });
      expect(set.has({ x: 1 })).toEqual(true);
    });
    it('should return false if the object is not in the set', () => {
      const set = new DeepSet();
      set.add({ x: 1 });
      expect(set.has({ x: 2 })).toEqual(false);
    });
  });
  describe('delete', () => {
    it('should delete the element', () => {
      const set = new DeepSet([{ x: 1 }]);
      set.delete({ x: 1 });
      expect(set.has({ x: 1 })).toEqual(false);
    });
    it('should return true when an item is deleted', () => {
      const set = new DeepSet([{ x: 1 }]);
      expect(set.delete({ x: 1 })).toEqual(true);
    });
    it('should return false if no item is deleted', () => {
      const set = new DeepSet([{ x: 1 }]);
      expect(set.delete({ x: 2 })).toEqual(false);
    });
  });
  describe('clear', () => {
    it('should clear all items in the set', () => {
      const set = new DeepSet([{ x: 1 }, { x: 2 }]);
      set.clear();
      expect(Array.from(set.values())).toEqual([]);
      expect(set.size).toEqual(0);
    });
  });
  describe('forEach', () => {
    it('should run a callback on every item', () => {
      const fn = jest.fn();
      const values = [1, 2];
      const set = new DeepSet(values);
      set.forEach(fn);
      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith(1);
      expect(fn).toHaveBeenCalledWith(2);
    });
  });
});
