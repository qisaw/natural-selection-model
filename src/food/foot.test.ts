import { Food } from './food';

describe('food', () => {
  describe('creation', () => {
    it('should set a uuid', () => {
      const food = new Food({ position: { x: 1, y: 1 } });
      expect(food.id).toBeDefined();
    });
    it('should set the position', () => {
      const food = new Food({ position: { x: 1, y: 1 } });
      expect(food.position).toEqual({ x: 1, y: 1 });
    });
    it('should set the energyAddition', () => {
      const food = new Food({ position: { x: 1, y: 1 }, energyAddition: 10 });
      expect(food.energyAddition).toEqual(10);
    });
    it('should set the energyAddition default if not passed in', () => {
      const food = new Food({ position: { x: 1, y: 1 } });
      expect(food.energyAddition).toEqual(1);
    });
  });
});
