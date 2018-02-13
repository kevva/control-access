'use strict';

module.exports = opts => (req, res) => {
	opts = Object.assign({}, opts);

	const allowCredentials = process.env.ACCESS_ALLOW_CREDENTIALS || opts.allowCredentials;
	const allowHeaders = process.env.ACCESS_ALLOW_HEADERS || opts.allowHeaders;
	const allowMethods = process.env.ACCESS_ALLOW_METHODS || opts.allowMethods;
	const allowOrigin = process.env.ACCESS_ALLOW_ORIGIN || opts.allowOrigin;
	const exposeHeaders = process.env.ACCESS_EXPOSE_HEADERS || opts.exposeHeaders;
	const maxAge = process.env.ACCESS_MAX_AGE || opts.maxAge;

	if (allowCredentials) {
		const val = typeof allowCredentials === 'string' ? Number(allowCredentials) : allowCredentials;

		if (val) {
			res.setHeader('access-control-allow-credentials', Boolean(val));
		}
	}

	if (allowHeaders) {
		const val = Array.isArray(allowHeaders) ? allowHeaders.join(',') : allowHeaders;
		res.setHeader('access-control-allow-headers', val);
	}

	if (allowMethods) {
		const val = Array.isArray(allowMethods) ? allowMethods.join(',') : allowMethods;
		res.setHeader('access-control-allow-methods', val);
	}

	if (allowOrigin) {
		res.setHeader('access-control-allow-origin', allowOrigin);

		if (allowOrigin !== '*') {
			res.setHeader('vary', 'origin');
		}
	}

	if (exposeHeaders) {
		const val = Array.isArray(exposeHeaders) ? exposeHeaders.join(',') : exposeHeaders;
		res.setHeader('Access-Control-Expose-Headers', val);
	}

	if (maxAge) {
		res.setHeader('access-control-max-age', String(maxAge));
	}
};
