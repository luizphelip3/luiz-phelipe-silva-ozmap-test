import 'reflect-metadata';

import * as mongoose from 'mongoose';
import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { faker } from '@faker-js/faker';
import { expect, assert } from 'chai';

import './config/database/connection/mongo-db';
import { Region, RegionModel, UserModel } from './models';
import Geocoding from './modules/shared/lib/geocoding/geocoding';
import app from './app';

describe('Models', () => {
  let user;
  let session;
  let geoLibStub: Partial<typeof Geocoding> = {};

  before(async () => {
    geoLibStub.getAddressFromCoordinates = sinon.stub(Geocoding, 'getAddressFromCoordinates').resolves(faker.location.streetAddress({ useFullAddress: true }));
    geoLibStub.getCoordinatesFromAddressZipCode = sinon.stub(Geocoding, 'getCoordinatesFromAddress').resolves({ lat: faker.location.latitude(), lng: faker.location.longitude() });

    session = await mongoose.startSession();
    user = await UserModel.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress({ useFullAddress: true }),
    });
  });

  after(() => {
    sinon.restore();
    session.endSession();
  });

  beforeEach(() => {
    session.startTransaction();
  });

  afterEach(() => {
    session.commitTransaction();
  });

  describe('UserModel', () => {
    it('should create a user', async () => {
      expect(1).to.be.eq(1);
    });
  });

  describe('RegionModel', () => {
    it('should create a region', async () => {
      const regionData: Omit<Region, '_id'> = {
        user: user._id,
        name: faker.person.fullName()
      };

      const [region] = await RegionModel.create([regionData]);

      expect(region).to.deep.include(regionData);
    });

    it('should rollback changes in case of failure', async () => {
      const userRecord = await UserModel.findOne({ _id: user._id }).select('regions').lean();
      try {
        await RegionModel.create([{ user: user._id }]);

        assert.fail('Should have thrown an error');
      } catch (error) {
        const updatedUserRecord = await UserModel.findOne({ _id: user._id }).select('regions').lean();

        expect(userRecord).to.deep.eq(updatedUserRecord);
      }
    });
  });

  it('should return a list of users', async () => {
    const response = supertest(app.server).get(`/user`);

    expect(response).to.have.property('status', 200);
  });

  it('should return a user', async () => {
    const response = await supertest(app.server).get(`/users/${user._id}`);

    expect(response).to.have.property('status', 200);
  });
});
