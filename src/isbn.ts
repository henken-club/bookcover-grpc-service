import got from 'got';

import {proxy} from './imgproxy';
import {BookcoverServer} from './protogen/bookcover';

export const openbd = (isbn: string) =>
  got
    .get('https://api.openbd.jp/v1/get', {searchParams: {isbn}})
    .json<[null | {summary: {cover?: string}}]>()
    .then((result) => result[0]?.summary.cover);

export const handler: BookcoverServer['findFromISBN'] = async (
  {request: {isbn}},
  callback,
) => {
  const url = await Promise.any([openbd(isbn)]);
  return callback(null, url ? {url: proxy(url)} : {});
};
