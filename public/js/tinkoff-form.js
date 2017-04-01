function makePayment(amount, orderId, description, name, email, phone) {
  var params = {
    //Код магазина (обязательный параметр), выдается банком.
    TerminalKey: "1490289453117DEMO",
    //Сумма заказа в копейках (обязательный параметр)
    Amount: amount,
    //Номер заказа (если не передан, принудительно устанавливается timestamp)
    OrderId: orderId,
    //Описание заказа (не обязательный параметр)
    Description: description,
    //Дополнительные параметры платежа
    DATA: "Email=" + email + "|Phone=" + phone + "|Name=" + name,
    //Флаг открытия платежной формы во фрейме: false - в отдельном окне, true - в текущем окне.
    Frame: true,
    //Язык формы оплаты: ru - русский язык, en - английский язык
    Language: "ru"
  };
  doPay(params);
}
