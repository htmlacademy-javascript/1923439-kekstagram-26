const getData = (onSucsses, fail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSucsses(photos);
    })
    .catch(() => {
      fail('Не удалось загрузить данные с сервера! Попробуйте обновить страницу!');
    });
};

const sendData = (onSucsses, fail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSucsses();
      } else {
        fail();
      }
    })
    .catch(() => {
      fail();
    });
};

export {getData, sendData};
