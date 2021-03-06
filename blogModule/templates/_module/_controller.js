'use strict';
define([
  'angular',
  './<%= routeFile %>',
  './<%= serviceFile %>',
  './<%= directiveFile %>'
], function(angular) {
  angular.module('<%= angularModuleName %>', [
    '<%= angularModuleName %>.routing',
    '<%= angularModuleName %>.service',
    '<%= angularModuleName %>.directive',
    'simplePagination'
  ])
          /**
           * Blog entries controller.
           * @param {type} $scope
           * @param {type} $log
           * @param {type} $translate
           * @param {type} service
           * @param {type} Pagination
           * @returns {undefined}
           */
          .controller('<%= moduleControllerClass %>',
          [
            '$rootScope',
            '$scope',
            '$log',
            '$translate',
            '<%=moduleName%>Service',
            'Pagination',
            function(
                    $rootScope,
                    $scope,
                    $log,
                    $translate,
                    service,
                    Pagination
                    ) {
              //Init pagination
              $scope.pagination = Pagination.getNew(3);
              //Template asignation
              $scope.template =
                      {
                        name: '<%=moduleName%>Entries.html',
                        url: 'scripts/modules/blog/templates/partials/<%=moduleName%>Entries.tpl.html'
                      };

              service.getAllEntries(function(entries) {
                $scope.blogEntries = entries;
                $scope.pagination.numPages = Math.ceil(entries.length / $scope.pagination.perPage);
              });
              /**
               * Filtering entries
               * @param {type} entry
               * @returns {entry}
               */
              $scope.filterBlogEntries = function(entry) {
                //Global filtering options (published and language)
                if (entry.published && $translate.use() === entry.lang) {
                  if ($rootScope.categoryId) {
                    if (entry.categoryId === $rootScope.categoryId) {
                      return entry;
                    }
                  } else {
                    return entry;
                  }
                  return entry;
                }
              };
            }])
          /**
           * Blog entry (detail) controller
           * @param {type} $scope
           * @param {type} $http
           * @param {type} $log
           * @param {type} $routeParams
           * @param {type} service
           * @returns {undefined}
           */
          .controller('<%= moduleControllerClass %>Detail',
          [
            '$scope',
            '$http',
            '$log',
            '$routeParams',
            '<%=moduleName%>Service',
            function(
                    $scope,
                    $http,
                    $log,
                    $routeParams,
                    service) {

              $scope.template =
                      {
                        name: '<%=moduleName%>Entry.html',
                        url: 'scripts/modules/blog/templates/partials/<%=moduleName%>Entry.tpl.html'
                      };

              service.getEntryById($routeParams.blogEntryId, function(entry) {
                $scope.blogEntry = entry;
              });
            }]);

});