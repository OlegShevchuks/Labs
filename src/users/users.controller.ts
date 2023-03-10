import { Controller } from '../core/decorators/controller.decorator';
import { Get, Post } from '../core/decorators/route.decorator';
import { RequestData } from '../core/interfaces/request-data.interface';
import { HttpException } from '../core/http-exception';
import HttpStatus from 'http-status';

interface User {
  name: string;
  surname: string;
  age: number;
  city: string;
}

@Controller('users')
export class UsersController {
  private readonly users: User[] = [];

  @Post()
  public postNewUser(requestData: RequestData<unknown, User>) {
    const { body } = requestData;

    if (!body.age) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Age is required');
    }

    if (!body.name) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Name is required');
    }
    
    if (!body.surname) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Name is required');
    }

    if (!body.city) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Name is required');
    }

    if (Number.isNaN(+body.age) || +body.age < 1 || +body.age > 100) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Age should be a positive number between 1 and 100'
      );
    }

    this.users.push(requestData.body);
    return requestData.body;
  }

  @Get()
  public getAllUsers() {
    return this.users;
  }

  @Get(':id')
  public getUserById(requestData: RequestData<{ id: string }>) {
    const id = Number(requestData.params.id);

    if (Number.isNaN(id) || id < 0){
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Id should be greater than or equal to 0'
      );
    }

    const user = this.users.at(id);
    
    if (!user) throw new HttpException(404, 'User Not Found');

    return user;
  }
}
