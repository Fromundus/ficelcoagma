import Login from './Login'

const OnsiteLogin = () => {
  return (
    <Login title='Onsite Registration' required_settings='onsite' required_role='user' registration_method='onsite' />
  )
}

export default OnsiteLogin
