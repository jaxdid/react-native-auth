import React, { Component } from 'react'
import { View } from 'react-native'
import Firebase from 'firebase'
import { Button, CardSection, Header, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount () {
    Firebase.initializeApp({
      apiKey: 'AIzaSyBCkUFHaY6IDwcWsCoOHYzl7jbYgEu0N1s',
      authDomain: 'react-native-auth-4837b.firebaseapp.com',
      databaseURL: 'https://react-native-auth-4837b.firebaseio.com',
      projectId: 'react-native-auth-4837b',
      storageBucket: 'react-native-auth-4837b.appspot.com',
      messagingSenderId: '501253777284'
    })

    Firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: user ? true : false })
    })
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => {Firebase.auth().signOut()}}>
              Log Out
            </Button>
          </CardSection>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner />
    }
  }

  render () {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    )
  }
}

export default App
