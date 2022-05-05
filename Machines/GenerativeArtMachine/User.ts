interface IUser {
  createEdition();
  creaEdizioneConDnaSpecifico(dna);
  creaEdizioneSuccessiva();
  creaEdizioneSpecifica();
  creaEdizioni(from, to);
  editaEdizione(edizione);
  cercaEdizione(edizione);
  getEdizione(edizione);
  getBatchDiEdizioni();
  //
  creaCollezione(path, tipo);
  editaCollezione();
  cercaCollezione();
}
interface IUserInterface {
  makeQuestion(question);
  listenForAnswer();
  sendMessage(data, key);
}
