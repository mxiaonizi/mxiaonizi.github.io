jQuery.extend(jQuery.validator.messages, {
  required: "此项为必填项 ",
  remote: "请修正该字段",
  email: "请输入正确格式的电子邮件",
  url: "请输入合法的网址",
  date: "请输入合法的日期",
  dateISO: "请输入合法的日期 (ISO).",
  number: "请输入正确的数字",
  digits: "只能输入整数",
  creditcard: "请输入合法的信用卡号",
  equalTo: "请再次输入相同的值",
  accept: "请输入拥有合法后缀名的字符串",
  maxlength: jQuery.validator.format("字数长度不能超过 {0} 位"),
  minlength: jQuery.validator.format("字数长度不能少于 {0} 位"),
  rangelength: jQuery.validator.format("字数长度限制在 {0} 到 {1} 之间"),
  range: jQuery.validator.format("值范围在 {0} 到 {1} 之间"),
  max: jQuery.validator.format("值不得小于{0} "),
  min: jQuery.validator.format("值不得大于{0} ")
});