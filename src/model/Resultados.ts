export class Resultados{
	result:number;
	respuestasCorrectas: number;
	respuestasIncorrectas: number;
	respuestasBlanco: number;
	aprobo:string;
	constructor(result:number,respuestasCorrectas:number,respuestasIncorrectas:number,respuestasBlanco:number){
		this.result=result;
		this.respuestasCorrectas=respuestasCorrectas;
		this.respuestasIncorrectas=respuestasIncorrectas;
		this.respuestasBlanco=respuestasBlanco;
	}

}