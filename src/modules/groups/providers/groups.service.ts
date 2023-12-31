import { IAddMemberDTO } from '../dto/add-member-dto';
import { ICreateGroup } from '../dto/create-group-dto';
import { IDeleteMemberDTO } from '../dto/delete-memeber-dto';
import { GatewayGroupsMysqlDatabase } from './../gateway/gateway-groups-mysql-database';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GroupsProvider {
  constructor(
    @Inject(GatewayGroupsMysqlDatabase)
    private readonly gatewayGroupsMysqlDatabase: GatewayGroupsMysqlDatabase,
  ) {}

  async createGroup(createGroup: ICreateGroup, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.create(
      createGroup,
      authorization,
    );
  }

  async addNewMember(newMember: IAddMemberDTO, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.addMember(
      newMember,
      authorization,
    );
  }

  async deleteMember(member: IDeleteMemberDTO, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.deleteMember(
      member,
      authorization,
    );
  }

  async updateMemberRole(member: IAddMemberDTO, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.updateRole(
      member,
      authorization,
    );
  }

  async readTargetGroup(group: string, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.allMembersFromTargetGroup(
      group,
      authorization,
    );
  }

  async readAllGroupsFromAuthor(authorId: string, authorization: string) {
    return await this.gatewayGroupsMysqlDatabase.allMembersFromAuthorsGroups(
      authorId,
      authorization,
    );
  }
}
