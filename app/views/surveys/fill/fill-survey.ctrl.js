angular.module('app.core').controller('FillSurveyController', function () {

  var vm = this;

  vm.calendar_open = false;

  vm.trailer = {};

  var current_trailer_index = -1;

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

  vm.trailer_down = function (trailer) {
    var current_trailer_order = trailer.trailer_order;
    var current_trailer_index = vm.trailers_entered.indexOf(trailer);
    if (current_trailer_index == vm.trailers_entered.length-1) {
      return;
    }
    var after_trailer = vm.trailers_entered[current_trailer_index + 1];
    trailer.trailer_order = after_trailer.trailer_order;
    after_trailer.trailer_order = current_trailer_order;
    order_trailers();
  };

  vm.trailer_up = function (trailer) {
    var current_trailer_order = trailer.trailer_order;
    var current_trailer_index = vm.trailers_entered.indexOf(trailer);
    if (current_trailer_index == 0) {
      return;
    }
    var before_trailer = vm.trailers_entered[current_trailer_index - 1];
    trailer.trailer_order = before_trailer.trailer_order;
    before_trailer.trailer_order = current_trailer_order;
    order_trailers();
  };

  vm.add_trailer = function () {
    if (current_trailer_index >= 0) {
      vm.trailers_entered.splice(current_trailer_index, 1, vm.trailer);
      current_trailer_index = -1;
    } else {
      vm.trailers_entered.push(vm.trailer);
    }
    order_trailers();
    vm.trailer = {};
  };

  vm.edit_trailer = function (trailer) {
    current_trailer_index = vm.trailers_entered.indexOf(trailer);
    vm.trailer = angular.copy(trailer);
  };

  vm.remove_trailer = function (trailer) {
    var index_for_remove = vm.trailers_entered.indexOf(trailer);
    if (index_for_remove !== -1) {
      vm.trailers_entered.splice(index_for_remove, 1);
    }
  };

  function order_trailers(){
    vm.trailers_entered.sort(function (a, b) {
      if(a.trailer_order < b.trailer_order){
        return -1;
      } else if(a.trailer_order > b.trailer_order){
        return 1;
      } else {
        return 0;
      }
    })
  }

});
