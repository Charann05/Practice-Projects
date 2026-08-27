import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TasksService } from '../../services/tasks/tasks.service';

import { CreateTaskDto } from '../../dto/create-task.dto';

@Controller('tasks')
export class TasksController {

  constructor(
    private readonly tasksService: TasksService,
  ) {}

  // POST /tasks
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      createTaskDto,
    );
  }

  // GET /tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // GET /tasks/:id
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.findOne(id);
  }

  // DELETE /tasks/:id
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.remove(id);
  }
}