import test from 'ava';
import { isMethod, parseRequestURL, replaceParams  } from './utils';

test('test isMethod', t => {
  // Accept UpperCase
  t.is(isMethod('GET'), true);
  t.is(isMethod('POST'), true);
  t.is(isMethod('PUT'), true);
  t.is(isMethod('DELETE'), true);
  t.is(isMethod('HEAD'), true);
  t.is(isMethod('OPTIONS'), true);
  t.is(isMethod('PATCH'), true);
  t.is(isMethod('PURGE'), true);
  t.is(isMethod('LINK'), true);
  t.is(isMethod('UNLINK'), true);
  // Accept LowerCase
  t.is(isMethod('get'), true);
  t.is(isMethod('post'), true);
  t.is(isMethod('put'), true);
  t.is(isMethod('delete'), true);
  t.is(isMethod('head'), true);
  t.is(isMethod('options'), true);
  t.is(isMethod('patch'), true);
  t.is(isMethod('purge'), true);
  t.is(isMethod('link'), true);
  t.is(isMethod('unlink'), true);
  // Not Accept Others
  t.is(isMethod('NO'), false);
});

test('test parseRequestURL', t => {
  // test parseRequestURL
  t.deepEqual(parseRequestURL('GET /'), { method: 'GET', url: '/' });
  t.deepEqual(parseRequestURL('POST /'), { method: 'POST', url: '/' });
  t.deepEqual(parseRequestURL('PUT /'), { method: 'PUT', url: '/' });
  t.deepEqual(parseRequestURL('DELETE /'), { method: 'DELETE', url: '/' });
})

test('test replaceParams', t => {
  // test replaceParams
  t.is(replaceParams('/', {}), '/');
  t.is(replaceParams('/{id}', { id: '1' }), '/1');
  t.is(replaceParams('/{id}/{name}', { id: '1', name: '2' }), '/1/2');
  t.is(replaceParams('/{id}/{name}', { id: '1', name: '2', other: '3' }), '/1/2');
});
