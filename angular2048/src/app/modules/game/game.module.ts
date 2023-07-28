import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameComponent } from './components/game/game.component';
import { GameService } from './services/game.service';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule],
  exports: [GameComponent],
  providers: [GameService],
})
export class GameModule {}
