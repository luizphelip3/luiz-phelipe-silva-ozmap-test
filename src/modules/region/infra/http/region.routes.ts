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
  '/regions/:userId',
  regionController.findRegions,
);
regionRouter.get(
  '/region/:userId',
  regionController.findOneRegion,
);
regionRouter.get(
  '/regions/coordinate/:userId',
  regionController.findOneRegionByCoordinate,
);

export { regionRouter };
