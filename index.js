const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const path = require('path');
const error = require('koa-json-error');
const parameter = require('koa-parameter');

const app = new Koa();
const routing = require('./routes/index');
const mongodb = require('./middleware/mongodb');

const {connectionBaseStr, staticBasePath} = require('./config');

app.use(error({
  postFormat: ({stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}));

app.use(KoaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, staticBasePath),
    keepExtensions: true
  }
}));

app.use(KoaStatic(
  path.join(__dirname, staticBasePath)
));

app.use(parameter(app));

app.use(mongodb());

routing(app);

const port = 5200 || process.env.port;

app.listen(port, () => {
  console.log(`App is listen on ${port}`);
});
