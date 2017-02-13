/**
 * Form field validation functions
 */

// Required validation
export const required = (value, allValue, props) =>
	value ? undefined : props.intl.messages['formValidation.required']

// Min length validation
// min 		pass in the minimum number
const minValue = min => (value, allValue, props) =>
	value && value.length < min ?
	props.intl.messages['formValidation.minLength'].replace('${min}', min) : undefined
export const minValue8 = minValue(8)

// Charater type exist validation
const characterExist = (regex, errMsg) => (value, allValue, props) =>
	!regex.test(value) ? props.intl.messages[errMsg] : undefined
export const haveUppercase = characterExist(/[A-Z]+/, 'formValidation.uppercase')
export const haveLowercase = characterExist(/[a-z]+/, 'formValidation.lowercase')
export const haveNumber = characterExist(/[0-9]+/, 'formValidation.number')
export const haveSpecial = characterExist(/[$@$!%*?&]+/, 'formValidation.special')

// Field match validation
// field 	pass in the form field name you want this field to match against
export const matchField = (field) => (value, allValue, props) =>
	allValue[field] !== value ? props.intl.messages['formValidation.passwordMatch'] : undefined

// Email validation
export const email = (value, allValue, props) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  props.intl.messages['formValidation.email'] : undefined