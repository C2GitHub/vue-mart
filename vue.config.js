module.exports = {
  lintOnSave: false,

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [],
      },
    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false,
    },
  },

  devServer: {
    before(app) {
      // 模拟后台服务器 express
      app.get('/api/login', (req, res) => {
        const { username, password } = req.query;
        console.log(username, password);

        if (username === 'zs' && password === '123') {
          res.json({ code: 1, token: 'tokenABC' });
        } else {
          res.status(401).json({ code: 0, message: '用户名或密码错误' });
        }
      });

      // 定义认证中间件
      function auth(req, res, next) {
        if (req.headers.token) {
          // 已认证
          next();
        } else {
          // 用户未授权
          res.sendStatus(401);
        }
      }

      // 对后台接口进行保护/api/userinfo
      app.get('/api/userinfo', auth, (req, res) => {
        res.json({ code: 1, data: { name: 'zs', age: 20 } });
      });
    },
  },
};
