angular.module('app.core').controller('BlankSurveyController', function(SurveyService){
    var vm = this;
    SurveyService.getRepos('enriquezrene').then(function (data) {
        console.log(data);
        vm.show = data;
    });

});
