'use strict';

describe('Model', function () {
  it('should create models with attributes', function () {
    var expected = new Model({id: 2, title: 'Test', test_boolean: true});
    expect(expected.get('id')).toBe(2);
    expect(expected.get('title')).toBe('Test');
    expect(expected.get('test_boolean')).toBeTruthy();
    expect(expected.has('test_boolean')).toBeTruthy();
    expect(expected.has('test_unknown')).toBeFalsy();

    expected.set('test_new', 12);
    expect(expected.get('test_new')).toBe(12);
    expect(expected.get('test_new')).toBeTruthy();

    expected.unset('test_new');
    expect(expected.has('test_new')).toBeFalsy();

    var cloned = expected.clone();
    expect(cloned.get('id')).toBeTruthy();
    cloned.clear();
    expect(cloned.get('id')).toBeFalsy();
    expect(expected.get('id')).toBeTruthy();

    var hash = expected.getAttributes();
    expect(hash.id).toBe(2);
    expect(hash.test_boolean).toBeTruthy();
  });

  it('should convert to date object when parser is specified', function () {
    var expected = new Model({created_at: '2014-12-12'}, {parsers: {created_at: 'date'}});
    expect(expected.get('created_at').getTime).toBeDefined();
  });

  it('should execute parser function when set attribute', function () {
    var expected = new Model({test: 2}, {parsers: {test: function (value) {return value * 2}}});
    expect(expected.get('test')).toBe(4);
    expect(expected.set('test', 5).get('test')).toBe(10);
  });

  it('should inherit and override methods', function () {
    var ParentModel = Model.extend({

      parsers: {
        'x2': function (value) { return value * 2; }
      },

      someMethod: function () {
        return 'parent'
      },
      getTestMessage: function () {
        return this.get('test_message');
      }
    });

    var ChildModel = ParentModel.extend({
      someMethod: function () {
        return 'child'
      }
    });

    var parent = new ParentModel({test_message: 'parent_message'});
    var child = new ChildModel({test_message: 'child_message'});
    expect(parent.someMethod()).toBe('parent');
    expect(parent.getTestMessage()).toBe('parent_message');
    expect(child.someMethod()).toBe('child');
    expect(child.getTestMessage()).toBe('child_message');
    expect(child.set('x2', 2).get('x2')).toBe(4);
  });
});