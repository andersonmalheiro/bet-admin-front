import React, { useState } from 'react';
import {
  minLengthValidator,
  maxLengthValidator,
  requiredValidator
} from 'utils/validators';

export interface Option {
  value?: string | number;
  label: string;
  selected?: boolean;
}

interface StyleConfig {
  labelStyle?: React.CSSProperties;
  labelClass?: string;
  inputStyle?: React.CSSProperties;
  inputClass?: string;
  wrapperStyle?: React.CSSProperties;
  wrapperClass?: string;
}

interface ValidatorsConfig {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: string;
  pattern?: string;
}

export interface InputAttribs {
  name?: string;
  type: string;
  label?: string;
  placeholder?: string;
  id?: string;
  onChange?: Function;
  disabled?: boolean;
  options?: Option[];
  validators?: ValidatorsConfig;
  stylingConfigs?: StyleConfig;
}

interface Props {
  config: InputAttribs;
}

interface Errors {
  minLength?: string;
  maxLength?: string;
  required?: string;
  min?: string;
  max?: string;
  email?: string;
}

export default function Input(props: Props) {
  const { config } = props;
  const { stylingConfigs = {} } = config;
  const [errors, setErrors] = useState({} as Errors);

  function validate(event: { target: any }, callback: Function = () => {}) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;
    const validators = config && config!.validators;

    if (config!.type !== 'checkbox' && config!.type !== 'select') {
      if (validators) {
        if (validators.minLength) {
          if (minLengthValidator(value, validators.minLength)) {
            errors['minLength'] && delete errors['minLength'];
          } else {
            setErrors({
              ...errors,
              minLength: `Este campo deve ter no mínimo ${validators.minLength} caracteres!`
            });
          }
        }

        if (validators.maxLength) {
          if (maxLengthValidator(value, validators.maxLength)) {
            errors['maxLength'] && delete errors['maxLength'];
          } else {
            setErrors({
              ...errors,
              maxLength: `Este campo deve ter até ${validators.maxLength} caracteres!`
            });
          }
        }

        if (validators.required) {
          if (requiredValidator(value)) {
            errors['required'] && delete errors['required'];
          } else {
            setErrors({
              ...errors,
              required: `Este campo é obrigatório`
            });
          }
        }
      }
    }
    callback(event);
  }

  switch (config!.type) {
    case 'select':
      return (
        <div
          className={(stylingConfigs && stylingConfigs['wrapperClass']) || ''}
          style={(stylingConfigs && stylingConfigs['wrapperStyle']) || {}}
        >
          <label
            htmlFor={config!.id}
            className={(stylingConfigs && stylingConfigs['labelClass']) || ''}
            style={(stylingConfigs && stylingConfigs['labelStyle']) || {}}
          >
            {config!.label}
          </label>
          <select
            className={
              (stylingConfigs && stylingConfigs['inputClass']) ||
              'custom-select'
            }
            name={config!.name}
            id={config!.id}
            required={config!.validators && config!.validators.required}
            disabled={config!.disabled}
            onChange={e => config.onChange && config.onChange(e)}
          >
            <option>{config!.placeholder || 'Selecione uma opção...'}</option>
            {config.options &&
              config.options.map((opt: Option) => {
                return (
                  <option
                    value={opt.value}
                    defaultValue={opt.label}
                    key={opt.label}
                  >
                    {opt.label}
                  </option>
                );
              })}
          </select>
        </div>
      );

    case 'textarea':
      return (
        <div
          className={(stylingConfigs && stylingConfigs['wrapperClass']) || ''}
          style={(stylingConfigs && stylingConfigs['wrapperStyle']) || {}}
        >
          <label
            htmlFor={config!.id}
            className={(stylingConfigs && stylingConfigs['labelClass']) || ''}
            style={(stylingConfigs && stylingConfigs['labelStyle']) || {}}
          >
            {config!.label}
          </label>
          <textarea
            className={(stylingConfigs && stylingConfigs['inputClass']) || ''}
            style={stylingConfigs.inputStyle || {}}
            name={config!.name}
            id={config!.id}
            cols={30}
            rows={5}
            required={config!.validators && config!.validators.required}
            disabled={config! && config!.disabled}
            minLength={config!.validators && config!.validators.minLength}
            maxLength={config!.validators && config!.validators.maxLength}
            onChange={e => config!.onChange && config!.onChange(e)}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div
          className={(stylingConfigs && stylingConfigs['wrapperClass']) || ''}
          style={(stylingConfigs && stylingConfigs['wrapperStyle']) || {}}
        >
          <label
            htmlFor={config!.id}
            className={(stylingConfigs && stylingConfigs['labelClass']) || ''}
            style={(stylingConfigs && stylingConfigs['labelStyle']) || {}}
          >
            {config!.label}
          </label>
          <input
            id={config!.id}
            type={config!.type}
            name={config!.name}
            className={(stylingConfigs && stylingConfigs['inputClass']) || ''}
            style={(stylingConfigs && stylingConfigs['inputStyle']) || {}}
            required={config!.validators && config!.validators.required}
            onChange={e => config!.onChange && config!.onChange(e)}
            disabled={config!.disabled}
          />
        </div>
      );

    default:
      return (
        <div
          className={(stylingConfigs && stylingConfigs['wrapperClass']) || ''}
          style={(stylingConfigs && stylingConfigs['wrapperStyle']) || {}}
        >
          <label
            htmlFor={config!.id}
            className={(stylingConfigs && stylingConfigs['labelClass']) || ''}
            style={(stylingConfigs && stylingConfigs['labelStyle']) || {}}
          >
            {config!.label}
          </label>
          <input
            id={config!.id}
            name={config!.name}
            type={config!.type}
            className={(stylingConfigs && stylingConfigs['inputClass']) || ''}
            style={(stylingConfigs && stylingConfigs['inputStyle']) || {}}
            required={config!.validators && config!.validators.required}
            min={config!.validators && config!.validators.min}
            max={config!.validators && config!.validators.max}
            minLength={config!.validators && config!.validators.minLength}
            maxLength={config!.validators && config!.validators.maxLength}
            placeholder={config!.placeholder}
            onChange={e => validate(e, config!.onChange)}
            disabled={config!.disabled}
          />
          {Object.keys(errors) && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <small>{errors['minLength']}</small>
              <small>{errors['maxLength']}</small>
              <small>{errors['min']}</small>
              <small>{errors['max']}</small>
              <small>{errors['email']}</small>
              <small>{errors['required']}</small>
            </div>
          )}
        </div>
      );
  }
}
