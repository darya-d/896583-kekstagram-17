'use strict';
// backend.js - module of server-side interaction using XHR

(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';// address of getting information from the server
  var POST_URL = 'https://js.dump.academy/kekstagram';// address of sending information to the server
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000; // 10 seconds

  /**
   * Function of getting information from the server
   *
   * @param {Object} onLoad - параметр успешного выполнения запроса
   * @param {Object} onError - параметр неуспешного выполнения запроса
   */
  var load = function (onLoad, onError) {
    var URL = GET_URL;
    createRequest('GET', URL, onLoad, onError);
  };

  /**
   * Function of sending data to the server
   *
   * @param {Object} data - объект, который содержит данные формы, которые будут отправлены на сервер
   * @param {Object} onLoad - параметр успешного выполнения запроса
   * @param {Object} onError -  параметр неуспешного выполнения запроса
   */
  var save = function (data, onLoad, onError) {
    var URL = POST_URL;
    createRequest('POST', URL, data, onLoad, onError);
  };

  /**
   * Function of creating request
   *
   * @param {String} method - название метода.
   * @param {String} url - адрес обращения к серверу.
   * @param {Object} data - объект, который содержит данные формы, которые будут отправлены на сервер
   * @param {Object} onLoad - функция обратного вызова, которая срабатывает при успешном выполнении запроса
   * @param {Object} onError - функция обратного вызова, которая срабатывает при неуспешном выполнении запроса
   */
  var createRequest = function (method, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // преобразование ответа сервера из текста в тип JSON.
    // обработчик события load сработает когда сервер вернет ответ.
    xhr.addEventListener('load', function () {
      // status - HTTP-код ответа.
      // statusText - текстовое описание статуса от сервера.
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ': ' + xhr.statusText);
      }
    });
    // Обработка возможных ошибок при загрузке
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения'); // ошибка в JSON
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс'); // время на возврат ответа сервера на запрос истекло
    });
    xhr.timeout = TIMEOUT; // 10 seconds

    xhr.open(method, url); // задаем параметры запроса
    xhr.send(data);// отправляем запрос на сервер
  };

  // add object to the global scope
  window.backend = {
    load: load,
    save: save,
    GET_URL: GET_URL
  };

})();
