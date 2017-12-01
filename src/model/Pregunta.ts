export class Pregunta {
  id_local: number;
  id_remote: number;
  name_question: string;
  id_evaluation: number;
  enunciado: string;
  picture: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;

  constructor(id_local: number, id_remote: number, name_question: string, id_evaluation: number, enunciado: string,picture: string, option1: string, option2: string, option3: string, option4: string, option5: string) {
    this.id_local = id_local;
    this.id_remote = id_remote;
    this.name_question = name_question;
    this.id_evaluation = id_evaluation;
    this.enunciado = enunciado;
    this.picture = picture;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.option5 = option5;
  }
}