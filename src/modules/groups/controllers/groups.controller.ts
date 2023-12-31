import { Body, Controller, Post, Req } from '@nestjs/common';
import { GroupsProvider } from '../providers/groups.service';
import { ICreateGroup } from '../dto/create-group-dto';
import { Request } from 'express';
import { IAddMemberDTO } from '../dto/add-member-dto';
import { IDeleteMemberDTO } from '../dto/delete-memeber-dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsProvider: GroupsProvider) {}

  @Post('create')
  async createGroup(@Body() group: ICreateGroup, @Req() req: Request) {
    return await this.groupsProvider.createGroup(
      group,
      req.headers.authorization,
    );
  }

  @Post('addmember')
  async addNewMember(@Body() member: IAddMemberDTO, @Req() req: Request) {
    return await this.groupsProvider.addNewMember(
      member,
      req.headers.authorization,
    );
  }

  @Post('deletemember')
  async deleteMember(@Body() member: IDeleteMemberDTO, @Req() req: Request) {
    return await this.groupsProvider.deleteMember(
      member,
      req.headers.authorization,
    );
  }

  @Post('updaterole')
  async updateMemberRole(@Body() member: IAddMemberDTO, @Req() req: Request) {
    return await this.groupsProvider.updateMemberRole(
      member,
      req.headers.authorization,
    );
  }

  @Post('group')
  async readTargetGroup(
    @Body() body: { groupId: string },
    @Req() req: Request,
  ) {
    return await this.groupsProvider.readTargetGroup(
      body.groupId,
      req.headers.authorization,
    );
  }

  @Post('groupauthor')
  async readGroupsFromAuthor(
    @Body() body: { authorId: string },
    @Req() req: Request,
  ) {
    return await this.groupsProvider.readAllGroupsFromAuthor(
      body.authorId,
      req.headers.authorization,
    );
  }
}
