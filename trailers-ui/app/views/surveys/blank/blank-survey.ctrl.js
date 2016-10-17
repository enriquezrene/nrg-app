angular.module('app.core').controller('BlankSurveyController', function () {
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
});
