import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AnswerType } from '../../types/answer.type';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html',
})
export class AnswerComponent implements OnInit {
  @Input('answerText') answerTextProps!: string;
  @Input('index') indexProps!: number;
  @Input('correctAnswer') correctAnswerProps!: AnswerType;
  @Input('currentAnswer') currentAnswerProps!: AnswerType | null;

  @Output('selectAnswer') selectAnswerEvent = new EventEmitter<AnswerType>();
  @HostListener('click', ['$event'])
  onClick() {
    this.selectAnswerEvent.emit(this.answerTextProps);
  }

  letterMapping: string[] = ['A', 'B', 'C', 'D'];

  constructor() {}

  ngOnInit(): void {
    if (!this.answerTextProps || this.indexProps === undefined) {
      throw new Error('Inputs in answer are not correct');
    }
  }

  selectAnswer(): void {}
}
