"use strict";angular.module("ineNamesApp",["ngMaterial","ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","pascalprecht.translate","ui.bootstrap","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$mdIconProvider",function(a){a.iconSet("social","../bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg",24).iconSet("action","../bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg",24).iconSet("alert","../bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg",24).iconSet("communication","../bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg",24).iconSet("navigation","../bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg",24)}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"RestCtrl",controllerAs:"rc"}).otherwise({redirectTo:"/"})}]),angular.module("ineNamesApp").config(["$translateProvider",function(a){a.useLoaderCache("$templateCache").useSanitizeValueStrategy("sanitize").useLocalStorage().fallbackLanguage("en").determinePreferredLanguage().useStaticFilesLoader({prefix:"lang/locale-",suffix:".json"}).use("en_US")}]),angular.module("ineNamesApp").controller("RestCtrl",["$scope","$injector","localStorageService",function(a,b,c){function d(){0===m.names.length&&m.getNames()}function e(){var a="abcdefghijklmnopqrstuvwxyz".split(""),b=0;angular.forEach(a,function(a){a="a"===a?"":"/"+a;var d="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FWikiproyecto%3ANombres_propios%2Flibro_de_los_nombres"+a+"'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22mw-content-text%22%5D%2Ful%2Fli%2Fa'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";n({method:"POST",url:d}).then(function(a){var d=a.data.query.results.a;angular.forEach(d,function(a){m.names.push(a.content)}),25===b&&(m.names=m.names.sort(),c.set("names",m.names)),b++},function(b){console.log("error in letter "+a+", "+b)})})}function f(){if(m.selectedItem&&m.genre){m.isValid=!0,m.buttonInvalid=!0,m.values=[],m.mode="indeterminate",m.name=m.selectedItem,m.nameCorrected=m.selectedItem.replace(/(á|à|ä|â)/gi,"a"),m.nameCorrected=m.nameCorrected.replace(/(é|è|ë|ê)/gi,"e"),m.nameCorrected=m.nameCorrected.replace(/(í|ì|ï|î)/gi,"i"),m.nameCorrected=m.nameCorrected.replace(/(ó|ò|ö|ô)/gi,"o"),m.nameCorrected=m.nameCorrected.replace(/(ú|ù|ü|û)/gi,"u");var a="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.ine.es%2Ftnombres%2FformGeneralresult.do%3FL%3D0%26vista%3D1%26orig%3Dine%26cmb4%3D99%26cmb6%3D"+m.nameCorrected+"%26cmb7%3D"+m.genre+"%26x%3D11%26y%3D5'%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22formGeneral%22%5D%2Ftable%5B1%5D%2Ftbody%2Ftr%2Ftd%2Ftable%5B2%5D%2Ftbody%2Ftr%5B5%5D%2Ftd%2Ftable%2Ftbody%2Ftr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";n({method:"POST",url:a}).then(function(a){a.data.query.results?(m.isValid=!0,m.values=a.data.query.results.tr,angular.forEach(m.values,function(a){if(!a.th.length){a.provincia=a.th.content.replace(/\n|^\s+|\s+$/gm,"");var b=a;angular.forEach(a.td,function(a,c){0===c?b.number=parseInt(a.content.replace(/\n|^\s+|\s+$|\t|[.]|<!--(.*?)-->/gm,"")):b.percent=a.content.replace(/\n|^\s+|\s+$|\t|[.]|<!--(.*?)-->/gm,"")})}})):m.isValid=!1,m.buttonInvalid=!1,m.mode=""},function(a){console.log("error in values request, "+a)})}}function g(a){m.reverse=m.predicate===a?!m.reverse:!0,m.predicate=a}function h(a){console.log("This functionality is yet to be implemented!",a)}function i(a){var b=a?m.names.filter(l(a)):m.names;return b}function j(a){o.info("Text changed to "+a)}function k(a){o.info("Item changed to "+JSON.stringify(a))}function l(a){var b=angular.lowercase(a);return function(a){return 0===a.toLowerCase().indexOf(b)}}var m=this,n=b.get("$http"),o=b.get("$log");this.namesStored=c.get("names"),this.names=m.namesStored||[],this.name="",this.nameCorrected="",this.values=[],this.genre="1",this.genres=[{value:"1",title:"Hombre"},{value:"6",title:"Mujer"}],this.getNames=e,this.getValues=f,this.isValid=!0,this.orderTable=g,this.predicate="",this.reverse=!1,this.buttonInvalid=!1,this.ordered=!1,this.mode="",m.simulateQuery=!1,m.isDisabled=!1,m.querySearch=i,m.selectedItemChange=k,m.searchTextChange=j,m.newState=h,a.$on("$destroy",function(){m=null,a=null}),d()}]),angular.module("ineNamesApp").directive("compileUnsafe",["$compile",function(a){return function(b,c,d){b.$watch(d.compileUnsafe,function(d,e){if(d&&(d!==e||!c[0].innerHTML)){var f=angular.element("<div>");f.append(d),c.empty().append(f.contents()),a(c.contents())(b)}})}}]),angular.module("ineNamesApp").directive("loading",["$http",function(a){return{restrict:"A",link:function(b,c){b.isLoading=function(){return a.pendingRequests.length>0},b.$watch(b.isLoading,function(a){a?c.show():c.hide()})}}}]);