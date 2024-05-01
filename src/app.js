const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const configs = require('./configs/config')
const app = express();

// init middlewares
app.use(morgan('dev'));
/**
 * app.use(morgan('compile'));
 * app.use(morgan('common'));
 * app.use(morgan('short'));
 * app.use(morgan('tiny'));
 */


// setting security helmet
const helmet = require('helmet');
// setting base
app.use(helmet.frameguard({
    action: 'deny'
}));
// strict transport security
const reqDuration = 2629746000;
app.use(
    helmet.hsts({
        maxAge: reqDuration,
    })
);

// content security policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
    },
}))
// x content type options
app.use(helmet.noSniff());
// x xss protection
app.use(helmet.xssFilter())
// referrer policy
app.use(helmet.referrerPolicy({
    policy: "no-referrer",
}))

// config i18n
if (checkEnable(configs.i18n.enable)) {
    const i18n = require('./configs/config.i18n')
    app.use(i18n.init)
}

// init routes
app.use('', require('./routes'))

// export
module.exports = app;
