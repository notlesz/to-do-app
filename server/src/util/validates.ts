export const validatePassword = (password: string) => {
  const validators = {
    validatorOne: {
      regex: /(?=.*[0-9])/,
      invalidText: "Sua senha deve conter pelo menos um dígito.",
    },
    validatorTwo: {
      regex: /(?=.*[az])/,
      invalidText: "Sua senha deve conter pelo menos uma letra minúscula.",
    },
    validatorThree: {
      regex: /(?=.*[AZ])/,
      invalidText: "Sua senha deve conter pelo menos uma letra maiúscula.",
    },
    validatorFour: {
      regex: /(?=.*[@#$%^&-+=()])/,
      invalidText:
        "Sua senha deve conter apenas letras, números e caracteres especiais.",
    },
    validatorFive: {
      regex: /.{6,}$/,
      invalidText: "Sua senha deve conter no mínimo 6 dígitos",
    },
  };

  // First Validator
  if (!password.match(validators.validatorOne.regex)) {
    return {
      isValid: false,
      message: validators.validatorOne.invalidText,
    };
  }

  // Second Validator
  if (!password.match(validators.validatorTwo.regex)) {
    return {
      isValid: false,
      message: validators.validatorTwo.invalidText,
    };
  }

  // Third Validator
  if (!password.match(validators.validatorThree.regex)) {
    return {
      isValid: false,
      message: validators.validatorThree.invalidText,
    };
  }

  // Fourth Validator
  if (!password.match(validators.validatorFour.regex)) {
    return {
      isValid: false,
      message: validators.validatorFour.invalidText,
    };
  }

  // Fifth Validator
  if (!password.match(validators.validatorFive.regex)) {
    return {
      isValid: false,
      message: validators.validatorFive.invalidText,
    };
  }

  return {
    isValid: true,
    message: "",
  };
};
