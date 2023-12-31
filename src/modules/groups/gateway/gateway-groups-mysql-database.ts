import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { IGatewayGroupsInterface } from './gateway-groups-interface';
import { ICreateGroup } from '../dto/create-group-dto';
import { PrismaService } from 'src/databases/prisma.service';
import { IAddMemberDTO } from '../dto/add-member-dto';
import { IDeleteMemberDTO } from '../dto/delete-memeber-dto';

@Injectable()
export class GatewayGroupsMysqlDatabase implements IGatewayGroupsInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async create(group: ICreateGroup, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return;
    }

    const createGroup = await this.prisma.group.create({
      data: {
        name: group.name,
        description: group.description,
        authorId: verifyJwt.payload.sub,
      },
      include: {
        author: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    await this.prisma.userMember.create({
      data: {
        userId: createGroup.authorId,
        groupsId: createGroup.id,
        role: 'ADMIN',
      },
    });

    return createGroup;
  }

  async addMember(addMember: IAddMemberDTO, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return 'JWT invalido';
    }

    const targetGroup = await this.prisma.group.findFirst({
      where: {
        id: addMember.groupId,
        authorId: verifyJwt.payload.sub,
      },
      include: {
        members: true,
      },
    });

    if (!targetGroup) {
      return 'Usuario não é author do Grupo que deseja adicionar um membro';
    }

    const memberAlredyExistInTargetGroup = targetGroup.members.find((e) =>
      e.userId === addMember.userId ? true : false,
    );

    if (memberAlredyExistInTargetGroup) {
      return 'Membro já se encontra no Grupo';
    }

    const newMember = await this.prisma.userMember.create({
      data: {
        groupsId: addMember.groupId,
        userId: addMember.userId,
        role: addMember.role,
      },
      include: {
        user: true,
      },
    });

    if (!newMember) {
      return 'Falha ao adicionar novo membro';
    }

    return newMember;
  }

  async deleteMember(deleteMember: IDeleteMemberDTO, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return 'JWT invalido';
    }

    const targetGroup = await this.prisma.group.findFirst({
      where: {
        id: deleteMember.groupId,
        authorId: verifyJwt.payload.sub,
      },
      include: {
        members: true,
      },
    });

    if (!targetGroup) {
      return 'Usuario não é author do Grupo que deseja adicionar um membro';
    }

    const memberAlredyExistInTargetGroup = targetGroup.members.find((e) =>
      e.userId === deleteMember.userId ? e : null,
    );

    if (!memberAlredyExistInTargetGroup) {
      return 'Membro não se encontra no grupo selecionado';
    }

    const userDeleted = await this.prisma.userMember.delete({
      where: {
        id: memberAlredyExistInTargetGroup.id,
      },
    });

    return userDeleted;
  }

  async updateRole(updateRole: IAddMemberDTO, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return 'JWT invalido';
    }

    const targetGroup = await this.prisma.group.findFirst({
      where: {
        id: updateRole.groupId,
        authorId: verifyJwt.payload.sub,
      },
      include: {
        members: true,
      },
    });

    if (!targetGroup) {
      return 'Usuario não é author do Grupo que deseja adicionar um membro';
    }

    const memberAlredyExistInTargetGroup = targetGroup.members.find((e) =>
      e.userId === updateRole.userId ? e : null,
    );

    if (!memberAlredyExistInTargetGroup) {
      return;
    }

    const updateMemberRole = await this.prisma.userMember.update({
      where: {
        id: memberAlredyExistInTargetGroup.id,
      },
      data: {
        role: updateRole.role,
      },
    });

    if (!updateMemberRole) {
      return;
    }

    return updateMemberRole;
  }

  async allMembersFromTargetGroup(groupId: string, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return;
    }

    const readMembers = await this.prisma.group.findMany({
      where: {
        id: groupId,
      },
      include: {
        author: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!readMembers) {
      return;
    }

    return readMembers;
  }

  async allMembersFromAuthorsGroups(authorId: string, authorization: string) {
    const verifyJwt = await this.jwt.verifyAsync(authorization, {
      complete: true,
    });

    if (!verifyJwt) {
      return;
    }

    const groupsFromAuthor = await this.prisma.group.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!groupsFromAuthor) {
      return;
    }

    return groupsFromAuthor;
  }
}
