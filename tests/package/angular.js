'use strict';

describe('JsCollection', function () {

  beforeEach(module('JsCollection'));

  it('should create JsModel factory', inject(function (JsModel) {
    expect(JsModel.extend).toBeDefined();
  }));
});

describe('JsCollection', function () {

  beforeEach(module('JsCollection'));

  it('should create JsCollection factory', inject(function (JsCollection) {
    expect(JsCollection.extend).toBeDefined();
  }));
});