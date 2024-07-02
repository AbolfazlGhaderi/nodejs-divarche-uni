import { Repository } from "typeorm";
import { appDataSrc } from "../../core/app/app.dataSource";
import { SessionEntity } from "../../models/session.entity";



class SessionRepository extends Repository<SessionEntity> {
  constructor() {
    super(SessionEntity, appDataSrc.manager);
  }

}

function createSessionRepository(): SessionRepository {
  return new SessionRepository();
}

export { SessionRepository, createSessionRepository };
