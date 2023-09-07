import {Command} from 'commander'
import SessionManager from '../Domain/Manager/sessionManager.js'

const AddUserCommand = new Command('addUser')

AddUserCommand
  .version('0.0.1')
  .description('Add user')
  .option('-e, --email <email>', 'User`s email')
  .option('-fn, --firstname <firstname>', 'User`s first name')
  .option('-ln, --lastname <lastname>', 'User`s last name')
  .option('-p, --password <password>', 'User`s password')
  .option('-a, --age <age>', 'User`s age')
  .option('-ia, --isAdmin <isAdmin>', 'User`s isAdmin')
  .action(async(env) =>
  {
    const payload = {
      ...env,
      age: +env.age,
      isAdmin: env.isAdmin === 'true',
    };

    const manager = new SessionManager();
    const user = await manager.signup(payload);

    if(user)
    {
       console.log('User created successfully');
    }
  });

export default AddUserCommand;