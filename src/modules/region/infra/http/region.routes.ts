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
  '/region/:userId',
  regionController.findOneRegion,
);
regionRouter.patch(
  '/region/:regionId/:userId',
  regionRequestsValidator.updateRegionValidate,
  regionController.updateRegion,
);
regionRouter.get(
  '/regions/distance',
  regionController.findRegionsByDistance,
);
regionRouter.get(
  '/regions/coordinate/:userId',
  regionController.findRegionsByCoordinate,
);
regionRouter.get(
  '/regions/:userId',
  regionController.findRegions,
);
regionRouter.delete(
  '/regions/:regionId/:userId',
  regionController.findRegions,
);


export { regionRouter };
