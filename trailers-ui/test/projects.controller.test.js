describe('projects', function () {

  // beforeEach(module('app.services'));
  beforeEach(module('app.core'));


  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('sum', function () {
    it('1 + 1 should equal 2', function () {
      var $scope = {};
      var controller = $controller('NrgProjectsController', { $scope: $scope });
      var response = controller.sum();
      expect(response).toBe('1');
    });
  //
  //   it('z should have default value of zero', function () {
  //     var $scope = {};
  //     var controller = $controller('CalculatorController', { $scope: $scope });
  //     // $scope.x = 0;
  //     // $scope.y = 0;
  //     // $scope.sum();
  //
  //     expect($scope.z).toBe(undefined);
  //   });
  });

});
