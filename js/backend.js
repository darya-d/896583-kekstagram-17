'use strict';
// backend.js - module of server-side interaction
// Модуль для отрисовки фотографий должен в качестве данных использовать данные, которые загружаются с удалённого сервера через XHR: https://js.dump.academy/kekstagram/data.
// Обработчик отправки формы должен отменять действие формы по умолчанию и отправлять данные формы посредством XHR на сервер https://js.dump.academy/kekstagram. При успешной загрузке данных на сервер закрывал окно редактирования фотографии и сбрасывал значения формы на те, что были поставлены по умолчанию.
(function () {
  // method of getting information from the server
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  // method of sending information to the server
  var POST_URL = 'https://js.dump.academy/kekstagram';

  /**
   * Function of getting information from the server
   *
   * @param {*} onLoad - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {*} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   */
  // ! код по загрузке является универсальным, его можно вынести в отдельный модуль load.js
  // все обработчики указывать до запросов, так как ответ с сервера может придти в любой момент времени
  var load = function (onLoad, onError) {
    // перед вызовом ставим new для создания нового (!) объекта
    var xhr = new XMLHttpRequest(); // сокращение от XMLHttpRequest
    // преобразовываем свойством responseType ответ сервера из текста в тип JSON
    xhr.responseType = 'json';
    // обработчик события load  сработает когда сервер вернет ответ
    xhr.addEventListener('load', function () {
      // 200 - прошло успешно
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        // если адрес, по которому запрашиваются данные, передает ошибку
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    // Обработка возможных ошибок при загрузке
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения'); // альтернативное событие - ошибка (на случай ошибки в JSON)
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс'); // альтернативное событие - время на возврат ответа сервера на запрос истекло
    });
    xhr.timeout = 10000; // таймер на 10 секунд

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  /**
   * Function of sending information to the server
   *
   * @param {*} data - объект, который содержит данные формы, которые будут отправлены на сервер
   * @param {*} onLoad - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {*} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   */
  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // 200 - прошло успешно
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  // add object to the global scope
  window.backend = {
    load: load,
    save: save
  };

})();
