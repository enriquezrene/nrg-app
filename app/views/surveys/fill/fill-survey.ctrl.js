angular.module('app.core').controller('FillSurveyController', function () {

  var vm = this;

  vm.calendar_open = false;

  vm.date = undefined;
  vm.date_picker_options = {
    formatYear: 'yy',
    startingDay: 1
  };
  vm.date_picker_alt_input_formats = ['d!/M!/yyyy'];

  vm.show_calendar = function () {
    vm.calendar_open = true;
  };

  vm.options = {
    types: '(cities)'
  };

  vm.trailers_entered = [];

  vm.add_trailer = function () {
    vm.trailers_entered.push({
      'trailer_order': vm.trailer_order,
      'trailer_name': vm.trailer_name,
      'trailer_duration': vm.trailer_duration
    });
    vm.trailer_order = '';
    vm.trailer_name = '';
    vm.trailer_duration = '';
  }
});
