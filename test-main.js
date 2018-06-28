var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {  
  if (TEST_REGEXP.test(file)) {    
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  packages: [
   { 
      name: '@syncfusion/ej2-base',
      location: 'node_modules/@syncfusion/ej2-base',
      main: 'index.js'            
    },
    { 
      name: '@syncfusion/ej2-data',
      location: 'node_modules/@syncfusion/ej2-data',
      main: 'index.js'            
    },
    { 
        name: '@syncfusion/ej2-svg-base',
        location: 'node_modules/@syncfusion/ej2-svg-base',
        main: 'index.js'            
      },
    {
        name: '@syncfusion/ej2-pdf-export',
        location: 'node_modules/@syncfusion/ej2-pdf-export',
        main: 'index.js'
    }, {
        name: '@syncfusion/ej2-file-utils',
        location: 'node_modules/@syncfusion/ej2-file-utils',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-compression',
        location: 'node_modules/@syncfusion/ej2-compression',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-navigations',
        location: 'node_modules/@syncfusion/ej2-navigations',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-calendars',
        location: 'node_modules/@syncfusion/ej2-calendars',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-popups',
        location: 'node_modules/@syncfusion/ej2-popups',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-lists',
        location: 'node_modules/@syncfusion/ej2-lists',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-inputs',
        location: 'node_modules/@syncfusion/ej2-inputs',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-buttons',
        location: 'node_modules/@syncfusion/ej2-buttons',
        main: 'index.js'
    },
    {
        name: '@syncfusion/ej2-splitbuttons',
        location: 'node_modules/@syncfusion/ej2-splitbuttons',
        main: 'index.js'
    }
    // Include dependent packages
  ],

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
