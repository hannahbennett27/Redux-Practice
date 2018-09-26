import { Auth } from 'aws-amplify';

export const signUp = (email, password, name) => {
  Auth.signUp({
    username: email,
    password: password,
    attributes: {
      name,
      email
    }
  })
    .then(res => console.log('RES >>>', res))
    .catch(err => console.log('ERROR >>>', err));
};
