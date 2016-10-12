angular.module('app.core').controller('i18nCtrl', ['$translate', '$scope', function ($translate, $scope) {

    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
    };

}]);