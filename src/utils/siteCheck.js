const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

export default async (urls) => {
  let results = [];
  await asyncForEach(urls, async (url) => {
    const cacheCheck = await fetch(`https://${url}/__mwp2_check__`);
    const httpdCheck = await fetch(`https://${url}/__mwp2_httpd_check__`);
    const phpCheck = await fetch(`https://${url}/__mwp2_php_check__`);
    results.push(
      `${cacheCheck.url}: ${cacheCheck.statusText}`,
      `${httpdCheck.url}: ${httpdCheck.statusText}`,
      `${phpCheck.url}: ${phpCheck.statusText}`,
    );
  })
  return results;
};