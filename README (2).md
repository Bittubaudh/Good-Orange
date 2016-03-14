# Starter files for MP2

## Setup
Use the following commands in your vagrant development environment to get this up and running
```bash
git clone --bare https://github.com/uiuc-web-programming/mp2_starter.git
cd mp2_starter.git
git push --mirror https://github.com/your-github-username/mp2.git
# Mirror-push to your mp2 repository. Use your github username in the URL. Change the URL if you're using bitbucket.
cd ..
rm -rf mp2_starter.git

git clone https://github.com/uiuc-web-programming/mp2_starter.git
cd mp2_starter
npm install
bower install
grunt compass
grunt uglify
grunt
```
## Development

You should edit the following:
- `public/index.html` - all files in the `public` folder will be served by the server
- `source_sass` folder's files - all sass files here will be compiled to `public/css/styles.css`
- `source_js` folder's files - all javascript files here will be uglified and put in `public/js/script.js`
- `public/foundation6_lib/scss/_settings.scss` - Edit this file to make changes to the foundation components. Do not touch other files in this folder. All the foundation scss files here will be compiled and put in `public/foundation6_lib/css/foundation.css`

You can leave this command running in the background while development for livereloading:

```bash
grunt
```

## Publishing & Submitting

When cloning to the server, run the setup commands again to ensure all the files are properly compiled.

Also, if you have problems debugging your JavaScript due to uglification, you can disable it by commenting out line 46 of `gruntfile.js` and uncommenting line 47. Your final submission should work with uglification though.
