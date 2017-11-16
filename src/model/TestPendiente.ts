export  class TestPendiente {
    id: number;
    course_period_id:number;
    name: string;
    subject:string;
    start_datetime:string;
    end_datetime:string;
    number_questions:number;
    correct_points:number;
    error_points:number;
    attempts_allowed:number; 
    duration_time:number;

    constructor(id: number, course_period_id:number,name: string, subject: string, start_datetime: string, end_datetime: string, number_questions: number, correct_points: number, error_points: number,attempts_allowed: number,duration_time: number) {
      this.id = id;
      this.course_period_id = course_period_id;
      this.name = name;
      this.subject = subject;
      this.start_datetime = start_datetime;
      this.end_datetime = end_datetime;
      this.number_questions = number_questions;
      this.correct_points = correct_points;
      this.error_points = error_points;
      this.attempts_allowed = attempts_allowed;
      this.duration_time = duration_time;
    }
  }