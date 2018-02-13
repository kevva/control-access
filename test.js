import {serial as test} from 'ava';
import got from 'got';
import micro from 'micro';
import testListen from 'test-listen';
import m from '.';

const macro = async (t, {header, opts}, expected) => {
	const handler = (req, res) => {
		m(opts)(req, res);
		return {};
	};

	const url = await testListen(micro(handler));
	t.is((await got(url, {json: true})).headers[header], expected);
};

const envMacro = async (t, {env, header}, expected) => {
	const ENV = process.env[env.key];
	process.env[env.key] = env.value;

	const handler = (req, res) => {
		m()(req, res);
		return {};
	};

	const url = await testListen(micro(handler));
	t.is((await got(url, {json: true})).headers[header], expected);
	process.env[env.key] = ENV;
};

test('set allowCredentials', [macro, envMacro], {
	opts: {allowCredentials: true},
	header: 'access-control-allow-credentials',
	env: {
		key: 'ACCESS_ALLOW_CREDENTIALS',
		value: '1'
	}
}, 'true');

test('omit setting allowCredentials if value is falsy', [macro, envMacro], {
	opts: {allowCredentials: false},
	header: 'access-control-allow-credentials',
	env: {
		key: 'ACCESS_ALLOW_CREDENTIALS',
		value: '0'
	}
}, undefined);

test('set allowHeaders', [macro, envMacro], {
	opts: {allowHeaders: ['Foo', 'Bar']},
	header: 'access-control-allow-headers',
	env: {
		key: 'ACCESS_ALLOW_HEADERS',
		value: 'Foo,Bar'
	}
}, 'Foo,Bar');

test('set allowMethods', [macro, envMacro], {
	opts: {allowMethods: ['GET', 'POST']},
	header: 'access-control-allow-methods',
	env: {
		key: 'ACCESS_ALLOW_METHODS',
		value: 'GET,POST'
	}
}, 'GET,POST');

test('set allowOrigin', [macro, envMacro], {
	opts: {allowOrigin: '*'},
	header: 'access-control-allow-origin',
	env: {
		key: 'ACCESS_ALLOW_ORIGIN',
		value: '*'
	}
}, '*');

test('set exposeHeaders', [macro, envMacro], {
	opts: {exposeHeaders: ['Foo', 'Bar']},
	header: 'access-control-expose-headers',
	env: {
		key: 'ACCESS_EXPOSE_HEADERS',
		value: 'Foo,Bar'
	}
}, 'Foo,Bar');

test('set maxAge', [macro, envMacro], {
	opts: {maxAge: 1024},
	header: 'access-control-max-age',
	env: {
		key: 'ACCESS_MAX_AGE',
		value: '1024'
	}
}, '1024');
