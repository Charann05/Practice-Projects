import {Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Task } from '../../entities/task.entity';

import { CreateTaskDto } from '../../dto/create-task.dto';


@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // CREATE
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(
      createTaskDto,
    );

    return this.taskRepository.save(task);
  }

  // READ ONE
  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({
      id,
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    return task;
  }

  // READ ALL
  async findAll() {
    return this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // DELETE
  async remove(id: number) {
    const task = await this.findOne(id);

    await this.taskRepository.remove(task);

    return {
      message: 'Task deleted successfully',
    };
  }
}