/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  const messagesMap = new Map([[true, 'Hooray!!! She said "Yes"!'], [false, 'Oh no, she said "No".']]);
  return new Promise((resolve, reject) => {
    if (typeof isPositiveAnswer === 'boolean') {
      resolve(messagesMap.get(isPositiveAnswer));
    } else {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
}


/**
 * Return Promise object that should be resolved with an array containing plain values.
 * The Function receives an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return new Promise((resolve, reject) => {
    const result = [];
    array.forEach((promise) => {
      promise.then((res) => result.push(res)).catch(reject);
    });
    resolve(result);
  });
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return new Promise((resolve, reject) => {
    array.forEach((promise) => {
      promise.then(resolve).catch((err) => reject(new Error(err.message)));
    });
  });
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
async function chainPromises(array, action) {
  const promiseAll = async (arr) => {
    const result = [];

    await arr.forEach((promise) => {
      promise
        .then((value) => result.push(value))
        .catch((err) => result.push(err));
    });

    return result.filter((item) => !(item instanceof Error));
  };

  const values = await promiseAll(array);

  return values.reduce(action);
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
