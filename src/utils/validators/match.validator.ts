import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

export const Match = <T>(property: keyof T, options?: ValidationOptions) => (
  object: object,
  propertyName: string
): void => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options,
    constraints: [property],
    validator: MatchConstraint,
  });
};

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: string, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as never)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(): string {
    return 'Passwords must match';
  }
}
