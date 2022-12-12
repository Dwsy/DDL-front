export const rules = {
  email: (v) => !!(v || '').match(/@/) || '请输入有效的电子邮件',
  length:
    (len, text = '文章摘要') =>
    (v) =>
      (v || '').length <= len || `${text}需小于或等于${len}个字符`,
  password: (v) =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|\W)).+$/) ||
    '密码必须包含大写字母、数字字符和特殊字符',
  required: (v) => !!v || '此字段是必需的。',
}
