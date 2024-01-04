import { IAddMemberDTO } from '../dto/add-member-dto';
import { ICreateGroup } from '../dto/create-group-dto';

export interface IGatewayGroupsInterface {
  create(group: ICreateGroup, authorization: string);
  addMember(addMember: IAddMemberDTO, authorization: string);
}
