export type HandleIDTypes = 'complete' | 'update' | 'remove';

export interface HandleIDEventInterface {
  id: number;
  handleIDType: HandleIDTypes;
}

export interface TodoInterface {
  id?: number;
  title: string;
  completed: boolean;
  updated: boolean;
}
