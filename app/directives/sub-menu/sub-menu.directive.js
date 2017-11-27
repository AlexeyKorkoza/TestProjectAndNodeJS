'use strict';

angular
    .module('myApp')
    .directive('subMenu', subMenu);

function subMenu() {
    const directive = {
        templateUrl: './app/directives/sub-menu/sub-menu.html',
        restrict: 'E',
        link,
    };
    return directive;

    // TODO remove focus after click by item of menu
    function link(scope) {

        scope.isOpen = false;

        scope.toggleMenu = () => {
            scope.isOpen = !scope.isOpen;
        }
    }
}

