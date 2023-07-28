import { Component, OnInit } from '@angular/core';
import { GameLogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameLogic],
})
export class GameComponent implements OnInit {
  constructor(public gameLogic: GameLogic) {}
  ngOnInit(): void {}

  startGame(): void {
    this.gameLogic.gameStart();
    const currentPlayer =
      'Current turn : Player: ' + this.gameLogic.currentTurn;
    const information = document.querySelector('.current-status');

    information.innerHTML = currentPlayer;
  }

  async clickSubfield(subfield: any): Promise<void> {
    if (this.gameLogic.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      this.gameLogic.setField(position, this.gameLogic.currentTurn);
      const color = this.gameLogic.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.gameLogic.checkGameEndWinner().then((end: boolean) => {
        if (this.gameLogic.gameStatus === 0 && end) {
          information.innerHTML =
            'The winner player number ' + this.gameLogic.currentTurn;
        }
      });

      await this.gameLogic.checkGameEndFull().then((end: boolean) => {
        if (this.gameLogic.gameStatus === 0 && end) {
          information.innerHTML = 'No winner, draw';
        }
      });

      this.gameLogic.changePlayer();

      if (this.gameLogic.gameStatus === 1) {
        const currentPlayer =
          'Current turn : Player: ' + this.gameLogic.currentTurn;
        information.innerHTML = currentPlayer;
      }
    }
  }
}
