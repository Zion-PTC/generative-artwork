import { IDna } from './Dna';
import { IEdition } from './Edition';

interface IUser {
  createEdition(): IUser;
  creaEdizioneConDnaSpecifico(dna: IDna): IUser;
  creaEdizioneSuccessiva(): IUser;
  creaEdizioneSpecifica(): IUser;
  creaEdizioni(from: number, to: number): IUser;
  editaEdizione(edizione: IEdition): IUser;
  cercaEdizione(edizione: IEdition): IUser;
  getEdizione(edizione: IEdition): IUser;
  getBatchDiEdizioni(): IUser;
  //
  creaCollezione(path: string, tipo: 'Edition' | 'Element'): IUser;
  editaCollezione(): IUser;
  cercaCollezione(): IUser;
}
interface IUserInterface {
  makeQuestion(question: unknown): IUser;
  listenForAnswer(): IUser;
  sendMessage(data: unknown): IUser;
}
