/*
 * grunt-init-nodejs-osaka
 * https://github.com/nodejs-osaka
 *
 * Licensed under the MIT license.
 */

'use strict';
var request = require('request');
var exec = require('child_process').exec;

var PATH = 'github.com/nodejs-osaka/';
var PATH_HTTPS = 'https://'+PATH;
var PATH_GIT = 'git://'+PATH;
var GROUP_PREFIX = 'nodejs-osaka-';

// 基本の説明
exports.description = '新発表資料を作るため';

exports.notes = '';
exports.after = '';
exports.warnOn = '*';

var userBlocks = {};

function getGithubUser(user, callback) {
  if(userBlocks[user]) {
    var userBlock = userBlocks[user];
    callback(userBlock.error, userBlock.userData);
  } else {
    var save = function(error, userData) {
      userBlocks[user] = {
        error: error,
        userData: userData
      };
      callback(error, userData);
    }
    request.get('https://github.com/'+user+'.json', function(err, response, body) {
      if(err) {
        save(err);
      } else {
        try {
           body = JSON.parse(body); 
        } catch(e) {
          save(e);
          return;
        }
        if(body.error) {
          save(body.error);
          return;
        }
        var data = body[0];
        if(!data) {
          save("あ！バグ！");
        } else {
          save(null, data);
        }
      }
    });
  }
}

exports.template = function(grunt, init, done) {
  init.prompts.name.message = '発表タイトル:';
  /*var originalNameDefault = init.prompts.name.default;
  init.prompts.name.default = function(value, data, done) {
    originalNameDefault(value, data, function(err, def) {
      done(err, GROUP_PREFIX+def);
    });
  };*/
  init.prompts.description.message = '発表説明:';

  init.prompts.description.default = function(value, data, done) {
    init.prompts.name.default(value, data, function(err, def) {
      done(err, def+"の発表");
    });
  };
  init.prompts['github_user'] = {
    message: 'Githubユーザー:',
    default: '',
    warning: '正しいユーザー名前が必要',
    validator: function(data, done) {
      if(data == "") {
        done(false);
      } else {
        getGithubUser(data, function(err, user) {
          if(err) {
            done(false);
          } else {
            done(true);
          }
        });
      }
    }
  }
  init.process({}, [
    // この事が必要です。
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('github_user')
  ], function(err, props) {
    if(err) {
      done(err);
      return;
    }
    getGithubUser(props.github_user, function(err, githubUser) {
      if(err) {
        done(err);
        return;
      }
      var shortName = props.name;
      if(shortName.indexOf(GROUP_PREFIX) == 0) {
        shortName = shortName.substr(GROUP_PREFIX.length);
      }
      props.shortName = shortName;
      props.name = GROUP_PREFIX + shortName;
      props.author_name = githubUser.actor_attributes.name;
      props.author_email = githubUser.actor_attributes.email;
      props.author_url = githubUser.actor_attributes.blog;
      props.homepage = PATH_HTTPS+shortName;
      props.repository = PATH_GIT+shortName+'.git';
      props.bugs = PATH_HTTPS+shortName+'/issues';
      props.licenses = ['MIT'];
      props.version = '0.0.0';
      props.keywords = ['node', 'osaka'];
      props.dependencies = {
        'express': '3.2.2',
        'ejs': '0.8.3',
        'mkdirp': '0.3.5',
        'node-sass': '0.4.4'
      }
      request.get('https://github.com/nodejs-osaka.json', function(err, response, body) {
        if(err) {
          done(err);
          return;
        }
        props.port = 8000 + JSON.parse(body).length;

        // rootから全部のファイルをコピする.
        var files = init.filesToCopy(props);

        // ライセンスファイルを
        init.addLicenseFiles(files, props.licenses);

        // ファイルコピをスタートする
        init.copyAndProcess(files, props);

        // Package.jsonはまだです。
        init.writePackageJSON('package.json', props, function(pkg) {
          pkg.scripts = {
            start: 'node start.js'
          }
          return pkg;
        });

        var child = exec('npm install', function(error, stdout, stderr) {
          if(error) {
            done(error);
            return;
          }
          var child = exec('npm shrinkwrap', function(error, stdout, stderr) {
            done(error);
          });
          child.stdout.pipe(process.stdout);
          child.stderr.pipe(process.stderr);
        });
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
      });
    });
  });

};
