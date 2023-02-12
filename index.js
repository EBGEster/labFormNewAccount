const formData = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword")
}
const errorEmptyField = "Rellena este campo"
var regExEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
const inputIdMapping = {
  "name": {
    errorElementId: "errorName",
    errorMessage: "Email invalido",
    errorIcon: "icon-name"
  },
  "email": {
    errorElementId: "errorEmail",
    errorMessage: "Email inválido",
    errorIcon: "icon-email"
  },
  "password": {
    errorElementId: "errorPassword",
    errorMessage: "No debe tener más de 8 caracteres",
    errorIcon: "icon-password"
  },
  "confirmPassword": {
    errorElementId: "errorConfirmPassword",
    errorMessage: "Las contraseñas no coinciden",
    errorIcon: "icon-confirm-password"
  },
}

const validate = (elem, isValid) => {
  if (!elem.value) {
    fail(elem, errorEmptyField)
    return false
  } 
  if (isValid) {
    succeed(elem)
    return true
  }
  fail(elem, inputIdMapping[elem.id].errorMessage)
  return false
}

const succeed = (elm) => {
  document.getElementById(inputIdMapping[elm.id].errorIcon).style.display = "inline"
  document.getElementById(inputIdMapping[elm.id].errorIcon).src = "images/success-icon.svg"
  document.getElementById(inputIdMapping[elm.id].errorElementId).innerHTML = ""
  elm.classList.remove('error-input')
  elm.classList.add('success-input')
}

const fail = (elm, errorMessage) => {
  document.getElementById(inputIdMapping[elm.id].errorElementId).innerHTML = errorMessage
  document.getElementById(inputIdMapping[elm.id].errorIcon).src = "images/error-icon.svg"
  document.getElementById(inputIdMapping[elm.id].errorIcon).style.display = "inline"
  elm.classList.remove('success-input')
  elm.classList.add('error-input')
}

const deleteTooltipCompletaCampo = () => {
  // Elimina el mensaje automático que saca HTML5 cuando un input es requerido
   Object.values(formData).forEach(elm => {
    elm.addEventListener('invalid', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })
  })
}

const validateForm = () => {
  deleteTooltipCompletaCampo()

  let validName = validate(formData.name,  formData.name.value)
  let validEmail =   validate(formData.email, regExEmail.test(formData.email.value)) 
  let validPassword =   validate(formData.password, formData.password.value.length <= 8)  
  let validConfirmPassword =   validate(formData.confirmPassword, formData.confirmPassword.value === formData.password.value)

  if (validName && validEmail && validPassword && validConfirmPassword) {
    setTimeout(function () {
      alert('La inscripción se ha realizado correctamente')
      document.querySelector('form').submit()
    }, 500);

    return true
  } 
  else return false
}

const imgOnError = () => {
  Array.from(document.getElementsByTagName('img')).forEach(e => e.style.display = 'none')
} 
