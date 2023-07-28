import { Status } from './gamestatus';

export class GameLogic {
  gameField: number[] = [];

  currentTurn: number;

  gameStatus: Status;

  winSituationsOne: number[][] = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0, 1],
  ];

  winSituationsTwo: number[][] = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
    [2, 0, 2, 0, 2, 0, 0, 0, 2],
  ];

  constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    console.log(this.currentTurn);

    this.gameStatus = Status.START;
  }

  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random() * 2) + 1;
    return startPlayer;
  }

  setField(position: number, value: number): void {
    this.gameField[position] = value;
    console.log(this.gameField);
  }

  getPlayerColorClass(): string {
    const colorClass = this.currentTurn === 2 ? 'player-two' : 'player-one';
    return colorClass;
  }

  changePlayer(): void {
    this.currentTurn = this.currentTurn === 2 ? 1 : 2;
  }

  arrayEquals(a: any[], b: any[]): boolean {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  async checkGameEndWinner(): Promise<boolean> {
    let isWinner = false;

    const checkArray =
      this.currentTurn === 1 ? this.winSituationsOne : this.winSituationsTwo;

    const currentArray = [];

    this.gameField.forEach((subField, index) => {
      if (subField !== this.currentTurn) {
        currentArray[index] = 0;
      } else {
        currentArray[index] = subField;
      }
    });

    checkArray.forEach((checkField, index) => {
      if (this.arrayEquals(checkField, currentArray)) {
        isWinner = true;
      }
    });

    if (isWinner) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;

    if (this.gameField.includes(0)) {
      isFull = false;
    }

    if (isFull) {
      console.log('Field is full');
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  gameEnd(): void {
    this.gameStatus = Status.STOP;
  }
}
