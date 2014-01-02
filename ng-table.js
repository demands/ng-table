/*! ngTable v0.3.2 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table - New BSD License */

!function(a,b){return"function"==typeof define&&define.amd?(define(["angular"],function(a){return b(a)}),void 0):b(a)}(angular||null,function(a){var b=a.module("ngTable",[]);b.factory("ngTableParams",["$q","$log",function(b,c){var d=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},e=function(e,f){var g=this;this.data=[],this.parameters=function(b,e){if(e=e||!1,a.isDefined(b)){for(var f in b){var g=b[f];if(e&&f.indexOf("[")>=0){for(var i=f.split(/\[(.*)\]/).reverse(),j="",k=0,l=i.length;l>k;k++){var m=i[k];if(""!==m){var n=g;g={},g[j=m]=d(n)?parseFloat(n):n}}h[j]=a.extend(h[j]||{},g[j])}else"sorting"==f&&a.isString(b.sorting)?h.sorting=b.sorting.split(","):h[f]=d(b[f])?parseFloat(b[f]):b[f]}return c.debug&&c.debug("ngTable: set parameters",h),this}return h},this.settings=function(b){return a.isDefined(b)?(a.isArray(b.data)&&(b.total=b.data.length),i=a.extend(i,b),c.debug&&c.debug("ngTable: set settings",i),this):i},this.page=function(b){return a.isDefined(b)?this.parameters({page:b}):h.page},this.total=function(b){return a.isDefined(b)?this.settings({total:b}):i.total},this.count=function(b){return a.isDefined(b)?this.parameters({count:b,page:1}):h.count},this.filter=function(b){return a.isDefined(b)?this.parameters({filter:b}):h.filter},this.sorting=function(){if(0==arguments.length)return h.sorting;for(var a=Array.prototype.concat.apply([],arguments),b=0;b<a.length;b+=1)"+"!==a[b][0]&&"-"!==a[b][0]&&(a[b]="+"+a[b]);return this.parameters({sorting:a})},this.isSortBy=function(b,c){return a.isDefined(h.sorting[b])&&h.sorting[b]==c},this.getData=function(b,c){a.isArray(this.data)&&a.isObject(c)?b.resolve(this.data.slice((c.page()-1)*c.count(),c.page()*c.count())):b.resolve([])},this.getGroups=function(d,e){var f=b.defer();f.promise.then(function(b){var f={};for(var g in b){var h=b[g],i=a.isFunction(e)?e(h):h[e];f[i]=f[i]||{data:[]},f[i].value=i,f[i].data.push(h)}var j=[];for(var k in f)j.push(f[k]);c.debug&&c.debug("ngTable: refresh groups",j),d.resolve(j)}),this.getData(f,g)},this.generatePagesArray=function(a,b,c){var d,e,f,g,h,i;if(d=11,i=[],h=Math.ceil(b/c),h>1){i.push({type:"prev",number:Math.max(1,a-1),active:a>1}),i.push({type:"first",number:1,active:a>1}),f=Math.round((d-5)/2),g=Math.max(2,a-f),e=Math.min(h-1,a+2*f-(a-g)),g=Math.max(2,g-(2*f-(e-g)));for(var j=g;e>=j;)j===g&&2!==j||j===e&&j!==h-1?i.push({type:"more",active:!1}):i.push({type:"page",number:j,active:a!==j}),j++;i.push({type:"last",number:h,active:a!==h}),i.push({type:"next",number:Math.min(h,a+1),active:h>a})}return i},this.url=function(b){b=b||!1;var c=b?[]:{};for(key in h)if(h.hasOwnProperty(key)){var d=h[key],e=encodeURIComponent(key);if(a.isArray(d))b?c.push(e+"="+d.join(",")):c[e]=d.join(",");else if("object"==typeof d){for(var f in d)if(!a.isUndefined(d[f])&&""!==d[f]){var g=e+"["+encodeURIComponent(f)+"]";b?c.push(g+"="+d[f]):c[g]=d[f]}}else a.isFunction(d)||a.isUndefined(d)||""===d||(b?c.push(e+"="+encodeURIComponent(d)):c[e]=encodeURIComponent(d))}return c},this.reload=function(){var a=b.defer(),d=this;i.$loading=!0,i.groupBy?i.getGroups(a,i.groupBy,this):i.getData(a,this),c.debug&&c.debug("ngTable: reload data"),a.promise.then(function(a){i.$loading=!1,c.debug&&c.debug("ngTable: current scope",i.$scope),d.data=i.groupBy?i.$scope.$groups=a:i.$scope.$data=a,i.$scope.pages=d.generatePagesArray(d.page(),d.total(),d.count())})},this.reloadPages=function(){var a=this;i.$scope.pages=a.generatePagesArray(a.page(),a.total(),a.count())};var h=this.$params={page:1,count:1,filter:{},sorting:{},group:{},groupBy:null},i={$scope:null,$loading:!1,data:null,total:0,counts:[10,25,50,100],getGroups:this.getGroups,getData:this.getData};return this.settings(f),this.parameters(e,!0),this};return e}]);var c=["$scope","ngTableParams","$q",function(a,b){a.$loading=!1,a.params||(a.params=new b),a.params.settings().$scope=a,a.$watch("params.$params",function(){a.params.settings().$scope=a,a.params.reload()},!0),a.sortBy=function(b){var c,d=a.parse(b.sortable);if(d){for(d=Array.prototype.concat.apply(d),c=0;c<a.$columns.length;c++)a.$columns[c].sorting=null;var e=a.params.sorting(),f={};for(c in e)f[e[c].substr(1)]=e[c][0];var g,h;for(c=0;c<d.length;c++)g=d[c],("-"==g[0]||"+"==g[0])&&(h=g[0],g=g.substr(1)),f[g]&&(h="+"==f[g]?"-":"+"),h||(h="+"),d[c]=h+g;b.sorting=d[0][0],a.params.sorting(d)}}}];return b.directive("ngTable",["$compile","$q","$parse",function(b,d,e){"use strict";return{restrict:"A",priority:1001,scope:!0,controller:c,compile:function(c){var d=[],f=0,g=null,h=c.find("thead");return a.forEach(a.element(c.find("tr")),function(b){b=a.element(b),b.hasClass("ng-table-group")||g||(g=b)}),g?(a.forEach(g.find("td"),function(b){var c=a.element(b);if(!c.attr("ignore-cell")||"true"!==c.attr("ignore-cell")){var g=function(a,b){return function(f){return e(c.attr("x-data-"+a)||c.attr("data-"+a)||c.attr(a))(f,{$columns:d})||b}},h=g("title"," "),i=g("header",!1),j=g("filter",!1)(),k=!1;j&&j.templateURL&&(k=j.templateURL,delete j.templateURL),c.attr("data-title-text",h()),d.push({id:f++,title:h,sortable:g("sortable",!1),"class":c.attr("x-data-header-class")||c.attr("data-header-class")||c.attr("header-class"),filter:j,filterTemplateURL:k,headerTemplateURL:i,filterData:c.attr("filter-data")?c.attr("filter-data"):null,show:c.attr("ng-show")?function(a){return e(c.attr("ng-show"))(a)}:function(){return!0}})}}),function(c,f,g){if(c.$loading=!1,c.$columns=d,c.$watch(g.ngTable,function(b){a.isUndefined(b)||(c.paramsModel=e(g.ngTable),c.params=b)},!0),c.parse=function(b){return a.isDefined(b)?b(c):""},g.showFilter&&c.$parent.$watch(g.showFilter,function(a){c.show_filter=a}),a.forEach(d,function(b){var d;if(b.filterData){if(d=e(b.filterData)(c,{$column:b}),!a.isObject(d)||!a.isObject(d.promise))throw new Error("Function "+b.filterData+" must be instance of $q.defer()");return delete b.filterData,d.promise.then(function(c){a.isArray(c)||(c=[]),c.unshift({title:"-",id:""}),b.data=c})}}),!f.hasClass("ng-table")){c.templates={header:g.templateHeader?g.templateHeader:"ng-table/header.html",pagination:g.templatePagination?g.templatePagination:"ng-table/pager.html"};var i=h.length>0?h:a.element(document.createElement("thead")).attr("ng-include","templates.header"),j=a.element(document.createElement("div")).attr("ng-include","templates.pagination");f.find("thead").remove();{f.find("tbody")}return f.prepend(i),b(i)(c),b(j)(c),f.addClass("ng-table"),f.after(j)}}):void 0}}}]),a.module("ngTable").run(["$templateCache",function(a){a.put("ng-table/filters/select-multiple.html",'<select ng-options="data.id as data.title for data in column.data" multiple ng-multiple="true" ng-model="params.filter()[name]" ng-show="filter==\'select-multiple\'" class="filter filter-select-multiple form-control"> </select>'),a.put("ng-table/filters/select.html",'<select ng-options="data.id as data.title for data in column.data" ng-model="params.filter()[name]" ng-show="filter==\'select\'" class="filter filter-select form-control"> </select>'),a.put("ng-table/filters/text.html",'<input type="text" ng-model="params.filter()[name]" ng-if="filter==\'text\'" class="input-filter form-control"/>'),a.put("ng-table/header.html",'<tr> <th ng-repeat="column in $columns" ng-class="{ \'sortable\': parse(column.sortable), \'sort-asc\': column.sorting==\'+\', \'sort-desc\': column.sorting==\'-\' }" ng-click="sortBy(column, $event)" ng-show="column.show(this)" ng-init="template=column.headerTemplateURL(this)" class="header {{column.class}}"> <div ng-if="!template" ng-show="!template" ng-bind="parse(column.title)"></div> <div ng-if="template" ng-show="template"><div ng-include="template"></div></div> </th> </tr> <tr ng-show="show_filter" class="ng-table-filters"> <th ng-repeat="column in $columns" ng-show="column.show(this)" class="filter"> <div ng-repeat="(name, filter) in column.filter"> <div ng-if="column.filterTemplateURL" ng-show="column.filterTemplateURL"> <div ng-include="column.filterTemplateURL"></div> </div> <div ng-if="!column.filterTemplateURL" ng-show="!column.filterTemplateURL"> <div ng-include="\'ng-table/filters/\' + filter + \'.html\'"></div> </div> </div> </th> </tr> '),a.put("ng-table/pager.html",'<div class="ng-cloak pager"> <div ng-if="params.settings().counts.length" class="page-count-control btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default btn-xs"> <span ng-bind="count"></span> </button> </div> <ul class="pagination"> <li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ')}]),b});
//# sourceMappingURL=ng-table.map