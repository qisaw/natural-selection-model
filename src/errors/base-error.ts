export class BaseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, message: string, data?: any) {
    super(message);
    this.name = name;
    this.data = data;
  }
}
