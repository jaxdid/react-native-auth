import React, { Component } from 'react'
import { Text } from 'react-native'
import Firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from './common'

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false }

  onLoginSubmit () {
    const { email, password } = this.state

    this.setState({ error: '', loading: true })

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        Firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }

  onLoginFail () {
    this.setState({ error: 'Authentication failed.', loading: false })
  }

  onLoginSuccess () {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  renderButton () {
    if (this.state.loading) {
      return <Spinner size={'small'} />
    }

    return (
      <Button onPress={this.onLoginSubmit.bind(this)}>
        Log in
      </Button>
    )
  }

  renderErrorText () {
    if (this.state.error) {
      return (
        <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center'}}>
          {this.state.error}
        </Text>
      )
    }
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            placeholder={'example@email.com'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            label={'Password'}
            placeholder={'passw0rd'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        {this.renderErrorText()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

export default LoginForm
