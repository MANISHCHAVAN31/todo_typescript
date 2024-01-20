export class ApiResponse {
  statusCode: number;
  data: any;
  message: string = "Success";
  success: boolean;

  constructor(statusCode: number, data: any, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
