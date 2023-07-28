import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuizStateInterface } from '../types/quizState.interface';
import { data } from '../data';
import { QuestionInterface } from '../types/question.interface';
import { AnswerType } from '../types/answer.type';

@Injectable()
export class QuizService {
  initialState: QuizStateInterface = {
    questions: data,
    currentQuestionIndex: 0,
    showResult: false,
    correctAnswerCount: 0,
    answers: this.shuffleAnswers(data[0]),
    currentAnswer: null,
  };

  state$ = new BehaviorSubject<QuizStateInterface>({
    ...this.initialState,
  });

  setState(partialState: Partial<QuizStateInterface>): void {
    this.state$.next({ ...this.state$.getValue(), ...partialState });
  }

  getState(): QuizStateInterface {
    return this.state$.getValue();
  }

  nextQuestion(): void {
    const state = this.getState();
    const newShowResults =
      state.currentQuestionIndex === state.questions.length - 1;
    const newCurrentQuestionIndex = newShowResults
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1;
    const newAnswers = newShowResults
      ? []
      : this.shuffleAnswers(state.questions[newCurrentQuestionIndex]);

    this.setState({
      currentQuestionIndex: newCurrentQuestionIndex,
      showResult: newShowResults,
      answers: newAnswers,
    });
  }

  restart(): void {
    this.setState(this.initialState);
  }

  selectAnswer(answer: AnswerType): void {
    this.setState({ currentAnswer: answer });
    console.log('selectAnswer in service', answer);
  }

  shuffleAnswers(question: QuestionInterface): AnswerType[] {
    const unshuffledAnswers = [
      ...question.incorrectAnswers,
      question.correctAnswer,
    ];

    return unshuffledAnswers
      .map((unshuffledAnswer) => ({
        sort: Math.random,
        value: unshuffledAnswer,
      }))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((el) => el.value);
  }
}
