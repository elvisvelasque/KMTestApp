export class Pregunta {
    id_question:number;
    id_test:number;
    order:number;
    question:string;
    picture:string;
    option1:string;
    option2:string;
    option3:string;
    option4:string;
    option5:string;
    answer:number;
    correct_points:number;
    error_points:number;
  
    constructor(id_question: number, id_test: number, order: number, question: string, picture: string, option1: string, option2: string, option3: string,option4: string,option5: string,answer: number,correct_points: number,error_points: number) {
      this.id_question = id_question;
      this.id_test = id_test;
      this.order = order;
      this.question = question;
      this.picture = picture;
      this.option1 = option1;
      this.option2 = option2;
      this.option3 = option3;
      this.option4 = option4;
      this.option5 = option5;
      this.option5 = option5;
      this.answer = answer;
      this.correct_points = correct_points;
      this.error_points = error_points;
    }
  }