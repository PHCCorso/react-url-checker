export type CheckURLResult = {
  valid: boolean;
  message: string;
  type?: 'file' | 'path';
};