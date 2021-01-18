export class BadRequest extends Error {
  details?: string[];
  data?: string;
  messsage: string;
  constructor(message: string, errors?: string[]) {
    const stringifyMsg = JSON.stringify({
      message,
      details: errors,
      name: 'BadRequest',
    });
    super(stringifyMsg);
    this.name = 'BadRequest';
  }
}
