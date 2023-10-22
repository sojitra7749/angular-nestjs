import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async seed() {
    const users = [
      {
        name: 'Rakesh Sojitra',
        email: 'rakesh@example.com',
        password: 'Test@123',
      },
      { name: 'John Doe', email: 'john@example.com', password: 'Test@123' },
    ];

    for (const user of users) {
      const isExist = await this.userModel
        .findOne({ email: user.email })
        .exec();
      !isExist && this.create(user);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findAll(query) {
    const page = query.page || 1;
    const perPage = query.pageSize || 10;
    const name = query.name || '';
    const email = query.email || '';

    const skip = (page - 1) * perPage;

    const filter = {} as Record<string, any>;
    name && (filter.name = { $regex: new RegExp(name, 'i') });
    email && (filter.email = { $regex: new RegExp(email, 'i') });

    const data = await this.userModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();

    const totalRecords = await this.userModel.countDocuments(filter).exec();
    return { data, totalRecords };
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
