import { Injectable, Scope } from '@nestjs/common';
import { Partner } from '@prisma/client';

/**
 * 1 - shared service - singleton
 * 2 - scoped service - request service
 * 3 - transient service - new instance
 */
@Injectable({
  scope: Scope.REQUEST,
})
export class TenantService {
  private tenant: Partner;

  setTenant(tenant: Partner) {
    this.tenant = tenant;
  }

  getTenant() {
    return this.tenant;
  }
}
