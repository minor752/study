import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent {
  questionLength$: Observable<number>;
  currentQuestionIndex$: Observable<number>;
  showResult$: Observable<boolean>;
  correctAnswerCount$: Observable<number>;

  constructor(private quizService: QuizService) {
    this.questionLength$ = this.quizService.state$.pipe(
      map((state) => state.questions.length)
    );

    this.currentQuestionIndex$ = this.quizService.state$.pipe(
      map((state) => state.currentQuestionIndex + 1)
    );

    this.showResult$ = this.quizService.state$.pipe(
      map((state) => state.showResult)
    );

    this.correctAnswerCount$ = this.quizService.state$.pipe(
      map((state) => state.correctAnswerCount)
    );
  }

  nextQuestion(): void {
    this.quizService.nextQuestion();
  }

  restart(): void {
    this.quizService.restart()
  }
}
