import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from 'class-validator';
import * as PasswordValidator from 'password-validator';

function passwordSchema() {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(255) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols(); // Must have at least 1 symbol
  return schema;
}

export function IsGoodPassword(
  validationOptions?: ValidationOptions & ValidatorOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isGoodPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: GoodPasswordConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'GoodPassword' })
export class GoodPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const isValid = passwordSchema().validate(value);

    if (isValid === true) {
      return true;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid password. Password must contain at least 8 characters, 2 digits, 1 symbol, and both uppercase and lowercase letters.';
  }
}
