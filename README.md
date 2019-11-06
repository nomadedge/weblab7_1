# weblab7_1
## Technologies
1. Handlebars - client-side HTML template engine
2. SASS - css compiler
## Deployment tutorial
1. Install node.js
2. Install browserify gobaly using command "npm install -g browserify"
3. Install SASS globaly using command "npm install -g sass"
4. Run "npm install" to install all dependencies
5. Run "browserify main.js -o bundle.js" to create bundle.js
6. Run "sass scss/site.scss css/site.css" to create css/site.css"
7. After every change in js files use "browserify main.js -o bundle.js"
8. After every change in site.scss file use "sass scss/site.scss css/site.css"