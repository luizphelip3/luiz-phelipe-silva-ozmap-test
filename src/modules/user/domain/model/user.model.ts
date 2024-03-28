import "reflect-metadata";

import { Prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { Region } from "../../../region/domain/model/region.model";
import { Base } from "../../../shared/utils/types/base.type";

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
