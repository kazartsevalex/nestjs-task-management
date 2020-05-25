import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE
  ];

  transform(status: any) {
    status = status.toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`${status} is an invalid status!`);
    }

    return status;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
