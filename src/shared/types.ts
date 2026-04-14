export type CheckURLResult = {
  exists: boolean;
  message: string;
  type?: 'file' | 'path';
};