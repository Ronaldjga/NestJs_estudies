import { Module } from '@nestjs/common';
import { GroupsController } from './controllers/groups.controller';
import { GroupsProvider } from './providers/groups.service';
import { GatewayGroupsMysqlDatabase } from './gateway/gateway-groups-mysql-database';

@Module({
  controllers: [GroupsController],
  providers: [GroupsProvider, GatewayGroupsMysqlDatabase],
})
export class GroupsModule {}
