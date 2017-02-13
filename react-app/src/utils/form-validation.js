export const required = (value, allValue, props) => value ? undefined : props.intl.messages['formValidation.required']

const minValue = min => (value, allValue, props) => value && value.length < min ? props.intl.messages['formValidation.minLength'].replace('${min}', min) : undefined
export const minValue8 = minValue(8)

const characterExist = (regex, errMsg) => (value, allValue, props) => !regex.test(value) ? props.intl.messages[errMsg] : undefined
export const haveUppercase = characterExist(/[A-Z]+/, 'formValidation.uppercase')
export const haveLowercase = characterExist(/[a-z]+/, 'formValidation.lowercase')
export const haveNumber = characterExist(/[0-9]+/, 'formValidation.number')
export const haveSpecial = characterExist(/[$@$!%*?&]+/, 'formValidation.special')

export const matchField = (field) => (value, allValue, props) => allValue[field] !== value ? props.intl.messages['formValidation.passwordMatch'] : undefined

export const email = (value, allValue, props) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  props.intl.messages['formValidation.email'] : undefined