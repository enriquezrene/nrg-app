angular.module('app.core').controller('FillSurveyController', function () {

    var vm = this;

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
