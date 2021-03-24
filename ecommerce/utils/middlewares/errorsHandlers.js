const Sentry = require("@sentry/node");
const boom = require("@hapi/boom");
const debug = require("debug")("app:error");
const { config } = require("../../config");
const isRequestAjaxOrApi = require("../../utils/isRequestAjaxOrApi");

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack }; // Object.assign({}, err, stack)
  }
}

Sentry.init({ 
  dsn: `https://${config.sentryDns}@o517791.ingest.sentry.io/${config.sentryId}`,
  
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0, 
});

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  debug(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  // catch errors for AJAX request or if an error ocurrs while streaming
  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload }
  } = err;

  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
};