import { AnswerType } from './answer.type';
import { QuestionInterface } from './question.interface';

export interface QuizStateInterface {
  questions: QuestionInterface[];
  currentQuestionIndex: number;
  showResult: boolean;
  correctAnswerCount: number;
  answers: AnswerType[];
  currentAnswer: AnswerType | null;
}
