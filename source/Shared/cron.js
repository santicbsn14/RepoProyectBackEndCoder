import cron from 'node-cron'
import SessionManager from '../Domain/Manager/sessionManager';
let cronProgrammed = async () =>{
    cron.schedule('0 0 */2 * *', () => {
    console.log('Ejecutando eliminación lógica de usuarios no conectados...');
    let manager = new SessionManager()
    manager.automaticUsersDelete();
  })}