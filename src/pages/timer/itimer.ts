export interface ITimer{
    second: number;
    secondsRemaining: number;
    runTimer : boolean;
    hasStarted: boolean;
    hasFinished: boolean;
    displayTime: string;
}