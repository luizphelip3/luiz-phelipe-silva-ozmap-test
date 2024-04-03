import { Router } from 'express';
import regionController from '../../presentation/controller/region.controller';
import regionRequestsValidator from '../../presentation/middleware/region-requests-validator/region-requests-validator';

const regionRouter = Router();

regionRouter.post(
  '/region',
  regionRequestsValidator.createRegionValidate,
  regionController.createRegion,
);

export { regionRouter };
