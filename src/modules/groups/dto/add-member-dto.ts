export interface IAddMemberDTO {
  groupId: string;
  userId: string;
  role: 'ADMIN' | 'MEMBER';
}
