export default class ValidatorService {

  emailValidator(event) {
    const value = event.target.value;
    if (typeof value === 'string' && value === '') {
      return {
        result: true,
        message: '',
      }
    }
    const re = /\S+@\S+\.\S+/;
    const regExpCheck = re.test(value);
    return {
      result: regExpCheck,
      message: regExpCheck ? '' : 'Должно быть похоже на почту',
    }
  }

  initialsValidator(event: EventTarget) {
    const value = event.target.value;
    if (typeof value === 'string' && value === '') {
      return {
        result: true,
        message: '',
      }
    }
    const re = /^[а-яА-ЯЁё]+$/;
    const regexpResult = re.test(value);
    const uppercaseTest = value[0].toUpperCase() === value[0];
    console.log(regexpResult)
    console.log(uppercaseTest)
    return {
      result: regexpResult && uppercaseTest,
      message: regexpResult && uppercaseTest ? '' : 'Слишком сложно думать короткий и лаконичный текст'
    }

  }

  phoneValidator(event){
    const value = event.target.value;
    if (typeof value === 'string' && value === '') {
      return {
        result: true,
        message: '',
      }
    }
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return {
      result: re.test(value),
      message: re.test(value) ? '' : 'Должно быть похоже на телефон'
    }

  }
}
