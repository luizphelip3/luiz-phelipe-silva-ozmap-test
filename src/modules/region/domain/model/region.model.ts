import "reflect-metadata";

import { Prop, Ref, modelOptions, mongoose, pre } from "@typegoose/typegoose";
import { Base } from "../../../shared/utils/types/base.type";
import { User, UserModel } from "../../../user/domain/model/user.model";
import ObjectId = mongoose.Types.ObjectId;

@pre<Region>("save", async function (next) {
  const region = this as Omit<any, keyof Region> & Region;

  if (!region._id) {
    region._id = new ObjectId().toString();
  }

  if (region.isNew) {
    const user = await UserModel.findOne({ _id: region.user });
    user.regions.push(region._id);
    await user.save({ session: region.$session() });
  }

  next(region.validateSync());
})
@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region extends Base {
  @Prop({ required: true, auto: true })
  _id: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ ref: () => User, required: true, type: () => String })
  user: Ref<User>;
}