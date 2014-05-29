'use strict';

describe('JsCollection', function () {
  it('should create model and collection classes in global scope', function () {
    expect(window.JsCollection).toBeDefined();
    expect(window.JsModel).toBeDefined();
  });
});
