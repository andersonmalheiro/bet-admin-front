import * as React from 'react';
import Input, { InputAttribs } from 'components/Input';

interface Props {
  inputs: InputAttribs[];
  submit: Function;
  submitText: string;
  submitClass?: string;
}

interface State {
  formValue: { [x: string]: any };
}

class Form extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Definição do state
  state: State = {
    formValue: {}
  };

  /**
   * @function handleInputChange
   * @param event Evento do input
   * @description Atualiza o state, montando um objeto com os valores do form.
   */
  handleInputChange(event: { target: any }) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name || target.id;
    this.setState((prevState: State) => {
      return {
        formValue: {
          ...prevState.formValue,
          [name]: value
        }
      };
    });
  }

  render() {
    return (
      <form
        className="card-body"
        onSubmit={e => this.props.submit(e, this.state.formValue)}
      >
        {this.props.inputs.map((config, key) => {
          config.onChange = this.handleInputChange;
          return <Input config={config} key={key} />;
        })}

        <div className="text-center mt-3" style={{ width: '100%' }}>
          <button
            type="submit"
            className={
              this.props.submitClass
                ? this.props.submitClass
                : 'btn btn-primary'
            }
          >
            {this.props.submitText || 'Confirmar'}
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
