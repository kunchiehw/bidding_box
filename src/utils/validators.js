import { POSSIBLE_LEVELS, STANDARD_SUITS } from './constants';

// HOC for all validator
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error(`'${componentName}': requires prop '${propName}'.`);
      }
      return null;
    }
    return validate(props, propName, componentName, location);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

export const levelValidator = createChainableTypeChecker((props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS';

  if (props.suit == null) {
    return new Error(`'${componentName}': requires prop 'suit' when validates prop '${propName}'.`);
  }

  if (props[propName]) {
    const level = props[propName];
    if (STANDARD_SUITS.includes(props.suit)) {
      if (!POSSIBLE_LEVELS.includes(level)) {
        return new Error(`'${componentName}': '${propName}' should be in POSSIBLE_LEVELS when 'suit' is in STANDARD_SUITS.`);
      }
    } else if (level !== 0) {
      return new Error(`'${componentName}': '${propName}' should be 0 when 'suit' is in SPECIAL_SUITS.`);
    }
  }

  return null;
});

export function foo() {}
