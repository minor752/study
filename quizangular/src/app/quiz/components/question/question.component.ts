import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { AnswerType } from '../../types/answer.type';
import { QuestionInterface } from '../../types/question.interface';
import { QuizStateInterface } from '../../types/quizState.interface';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit {
  question$: Observable<QuestionInterface>;
  answers$: Observable<AnswerType[]>;
  correctAnswer$: Observable<AnswerType>;
  currentAnswer$: Observable<AnswerType | null>;

  constructor(private quizService: QuizService) {
    this.question$ = this.quizService.state$.pipe(
      map((state) => state.questions[state.currentQuestionIndex])
    );

    this.answers$ = this.quizService.state$.pipe(map((state) => state.answers));
    this.correctAnswer$ = this.question$.pipe(
      map((question) => question.correctAnswer)
    );
    this.currentAnswer$ = this.quizService.state$.pipe(
      map((state) => state.currentAnswer)
    );
  }

  selectAnswer(answer: AnswerType): void {
    this.quizService.selectAnswer(answer);
  }

  ngOnInit(): void {}
}
