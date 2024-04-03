import { Router } from 'express';
import regionController from '../../presentation/controller/region.controller';
import regionRequestsValidator from '../../presentation/middleware/region-requests-validator/region-requests-validator';

const regionRouter = Router();

regionRouter.post(
  '/region',
  regionRequestsValidator.createRegionValidate,
  regionController.createRegion,
);
regionRouter.get(
  '/regions',
  regionController.findRegions,
);
regionRouter.get(
  '/region',
  regionController.findOneRegion,
);
regionRouter.get(
  '/region/coordinate',
  regionController.findOneRegion,
);

export { regionRouter };
