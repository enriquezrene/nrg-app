angular.module('app.core').controller('FillSurveyController', function () {

  var vm = this;

  vm.calendar_open = false;

  vm.current_trailer = undefined;

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

  vm.trailers_entered = [
    {
      'trailer_order': 1,
      'trailer_name': 'Star Wars II',
      'trailer_duration': 90,
      'trailer_distributor': 'Universal World'
    },
    {
      'trailer_order': 2,
      'trailer_name': 'Pocahontas',
      'trailer_duration': 30,
      'trailer_distributor': 'Disney'
    }
  ];

  vm.add_trailer = function () {
    vm.current_trailer = undefined;
    vm.trailers_entered.push({
      'trailer_order': vm.trailer_order,
      'trailer_name': vm.trailer_name,
      'trailer_duration': vm.trailer_duration,
      'trailer_distributor': vm.trailer_distributor
    });
    vm.trailer_order = '';
    vm.trailer_name = '';
    vm.trailer_duration = '';
    vm.trailer_duration_classification = '';
    vm.trailer_distributor = '';
  };

  vm.edit_trailer = function (trailer) {
    vm.current_trailer = trailer;
    vm.trailer_order = trailer.trailer_order;
    vm.trailer_name = trailer.trailer_name;
    vm.trailer_duration = trailer.trailer_duration;
    vm.trailer_duration_classification = trailer.trailer_duration_classification;
    vm.trailer_distributor = trailer.trailer_distributor;
  };

  vm.remove_trailer = function (trailer) {
    var index_for_remove = vm.trailers_entered.indexOf(trailer);
    if(index_for_remove!==-1){
      vm.trailers_entered.splice(index_for_remove, 1);
    }
  }
});
