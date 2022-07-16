const getData = (onSuccess, fail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => fail('Не удалось загрузить данные с сервера! Попробуйте обновить страницу!'));
};

const sendData = (onSuccess, fail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        fail();
      }
    })
    .catch(() => {
      fail();
    });
};

export {getData, sendData};
