
export default class SearchViewCtrl {

  constructor (SearchService, $scope, $window, $location, $state) {
    'ngInject';
    $scope.SearchService = SearchService;
    $scope.data = {};
    $scope.$window = $window;
    $scope.$state = $state;
    $scope.$location = $location;
    $scope.query = $scope.$location.search();
    $scope.data.text = $scope.query.q;
    $scope.page_num = 0;
    $scope.max_pages = 1;
    $scope.offset = 0;
    $scope.limit = 10;
    $scope.total_hits = 0;
    $scope.hits = {};
    $scope.data.type_filter = $state.params.type_filter;
    $scope.data.text = $state.params.query_string;
    $scope.prettyFilterName = {
      'cms': 'Web Content',
      'private_files': 'My Data' ,
      'published': 'Published Projects',
      'public_files': 'Public Files'
    };

    $scope.next = function () {
      $scope.page_num = $scope.page_num + 1;
      $scope.search();
    };

    $scope.prev = function () {
      $scope.page_num--;
      if ($scope.page_num < 0) $scope.page_num = 0;
      $scope.search();
    };

    $scope.filter = function(ftype) {
      $scope.data.type_filter = ftype;
      $scope.page_num = 0;
      $scope.search_browse(false);
    };

    $scope.search_browse = function(switch_filter) {
      $state.go('wb.search', {'query_string': $scope.data.text, 'type_filter': $scope.data.type_filter, 'switch_filter': switch_filter});
    };

    $scope.search = function(reset) {
      if (reset) {
        $scope.page_num = 0;
      }
      if ($scope.data.text) {
        $scope.offset = $scope.page_num * $scope.limit;

        return $scope.SearchService
          .search($scope.data.text, $scope.limit, $scope.offset, $scope.data.type_filter)
          .then( (resp) => {
            $scope.data.search_results = resp.response;
            //$scope.data.hits = resp.hits;
            $scope.total_hits = $scope.data.search_results.total_hits;
            $scope.max_pages = Math.ceil($scope.data.search_results.total_hits / $scope.limit);
            if ($scope.data.search_results.filter != $scope.data.type_filter && $state.params.switch_filter) {
              $scope.data.type_filter = $scope.data.search_results.filter;
              $scope.search_browse(true);
            }

          });
      }
      else {
        $scope.data.search_results = {};
      };
      return $scope.data.search_results;
    };

    $scope.ddSystemRoute = function() {
      switch($scope.data.type_filter) {
        case 'private_files':
          return 'agave';
          break;
        case 'public_files':
          return 'public';
          break;

      }
      return 0;
    };

    $scope.makeUrl = function(listing) {
      let url = $scope.$state.href('db.communityData', {systemId: listing.system, filePath:listing.path});
      //url='hello'
      return url;
    };
    if ($scope.data.text) {
      $scope.search(true);
    }

  }  // Close constructor.
}  // Close class.
