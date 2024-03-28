import "reflect-metadata";

import { Prop, Ref, getModelForClass, pre } from "@typegoose/typegoose";
import lib from "../../../shared/lib/geo-lib";
import { Region } from "../../../region/domain/model/region.model";
import { Base } from "../../../shared/utils/types/base.type";

@pre<User>("save", async function (next) {
  const region = this as Omit<any, keyof User> & User;

  if (region.isModified("coordinates")) {
    region.address = await lib.getAddressFromCoordinates(region.coordinates);
  } else if (region.isModified("address")) {
    const { lat, lng } = await lib.getCoordinatesFromAddress(region.address);

    region.coordinates = [lng, lat];
  }

  next();
})

export class User extends Base {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, type: () => [Number] })
  coordinates: [number, number];

  @Prop({ required: true, default: [], ref: () => Region, type: () => String })
  regions: Ref<Region>[];
}

export const UserModel = getModelForClass(User);
