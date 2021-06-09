console.log('module loaded');

async function start() {
  return await Promise.resolve('async stuff works too');
}

start().then(console.log);
