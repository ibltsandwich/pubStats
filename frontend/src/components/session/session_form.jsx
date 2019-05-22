import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    if (this.sessionSubmit) {
      if (this.props.formType === 'Login') {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
          this.sessionSubmit.disabled = false;
        } else {
          this.sessionSubmit.disabled = true;
        }
      } else if (this.props.formType === 'Register') {
        if (this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.password2.length > 0) {
          this.sessionSubmit.disabled = false;
        } else {
          this.sessionSubmit.disabled = true;
        }
      }
    };

    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul className="session-errors-list">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              * {error}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form">
          <h1>{this.props.message}</h1>
          {this.renderErrors()}
          <br />
          <label>Username
            <br/>
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              className="session-input"
              required
            />
          </label>
          <br />
          {this.props.formType === 'Register' ?
          <>
          <label>Email address
            <br/>
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className="session-input"
              required
            />
          </label>
          <br/> 
          </> : null }
          <label>Password
            <br/>
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              className="session-input"
            />
          </label>
          <br />

          {this.props.formType === 'Register' ? 
          <>
            <label>Confirm Password
              <br/>
              <input type="password"
                value={this.state.password2}
                onChange={this.update('password2')}
                className="session-input"
              />
            </label> 
            <br/> 
          </> : null }

          <input className="session-submit" type="submit" ref={elem => this.sessionSubmit = elem} value={this.props.formType} disabled/>
          <br />
          {this.props.navLink}
        </form>

      </div>
    );
  }
}
export default SessionForm;