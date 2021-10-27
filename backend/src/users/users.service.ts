import { Injectable } from '@nestjs/common';
import User from './model/User';

@Injectable()
export class UsersService {
  private readonly users = [
    // User сворено для демонстраційних цілей.
    // Можливе зверігання Users у базі данних з шифруванням паролю,
    // але ми не будемо це авторизацію у рамках цієї роботи

    new User(1, 'john', 'changeme'),
    new User(2, 'maria', 'guess'),
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
