'use strict';

describe('Collection', function () {
  it('should create collection of models', function () {
    var collection = new Collection([
      {id: 1, message: 'first'},
      {id: 2, message: 'second'}
    ]);

    expect(collection.get(2) instanceof Model).toBeTruthy();
    expect(collection.get(2).get('message')).toBe('second');
    expect(collection.size()).toBe(2);
  });

  it('should use custom id attribute', function () {
    var collection = new Collection([
      {_id: 1, message: 'first'},
      {_id: 2, message: 'second'}
    ], {
      id: '_id'
    });
    expect(collection.get(2) instanceof Model).toBeTruthy();
    expect(collection.get(2).get('message')).toBe('second');
  });

  it('should override model function', function () {
    var CustomModel = Model.extend({newFunction: function () {}});
    var collection = new Collection([{id: 1}], {model: CustomModel});
    expect(collection.get(1) instanceof CustomModel).toBeTruthy();
    expect(collection.get(1).newFunction).toBeDefined();
  });

  it('should use comparator function|string|object', function () {
    var collection = new Collection([{id: 3}, {id: 1}, {id: 2}], {comparator: function (item) { return item.get('id'); }});
    expect(collection.models[0].get('id')).toBe(1);
    expect(collection.models[1].get('id')).toBe(2);
    expect(collection.models[2].get('id')).toBe(3);
  });

  it('should update existing model by id', function () {
    var collection = new Collection([{id: 2, message: 'first'}]);
    collection.add({id: 2, message: 'second'});
    expect(collection.size()).toBe(1);
    expect(collection.get(2).get('message')).toBe('second');
  });

  it('should remove model from collection', function () {
    var collection = new Collection([{id: 2, message: 'first'}]);
    collection.remove(collection.get(2));
    expect(collection.size()).toBe(0);
    expect(collection.byId[2]).toBeNull();
    collection = new Collection([{name: 2, message: 'test id'}], {id: 'name'});
    collection.remove(collection.get(2));
    expect(collection.size()).toBe(0);
    expect(collection.byId[2]).toBeNull();
  })
});