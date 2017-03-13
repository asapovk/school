

var frmvalidator  = new Validator("myform");
frmvalidator.EnableOnPageErrorDisplaySingleBox();
frmvalidator.EnableMsgsTogether();

frmvalidator.addValidation("email","req", "Пожалйста укажите email");
frmvalidator.addValidation("email","email", "email введен некорректно");
frmvalidator.addValidation("phone","req", "Пожалуйста укажеите мобильный телефон");
//frmvalidator.addValidation("sum", "regexp=[0-9]+", "Введите корректную сумму");
frmvalidator.addValidation("sum", "req", "Введите зачисляемую сумму!");
frmvalidator.addValidation("sum","numeric", "Введите корректную сумму.");
frmvalidator.addValidation("sum","greaterthan=0.0099999", "Введите корректную сумму.");
