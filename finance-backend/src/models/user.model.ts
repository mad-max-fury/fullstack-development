import {
  prop,
  modelOptions,
  pre,
  getModelForClass,
  Severity,
  DocumentType,
  index,
  Ref,
} from "@typegoose/typegoose";

import argon2 from "argon2";
import log from "../utils/logger";

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop()
  phoneNumber?: string;

  @prop({ default: false })
  isVerified: boolean;

  @prop()
  verificationCode?: string;

  @prop()
  passwordResetCode: string | null;

  @prop()
  lastLogin?: Date;

  @prop({ default: true })
  isActive: boolean;

  @prop({
    type: () => ({
      pushNotifications: Boolean,
      emailNotifications: Boolean,
      smsNotifications: Boolean,
      marketingEmails: Boolean,
    }),
    default: {
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
    },
  })
  preferences: {
    pushNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };

  async comparePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      const isMatch = await argon2.verify(this.password, candidatePassword);
      return isMatch;
    } catch (error) {
      log.error(error, "could not compare password");
      return false;
    }
  }

  toJson(this: DocumentType<Partial<User>>) {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.passwordResetCode;
    delete userObject.verificationCode;
    return userObject;
  }

  updateLastLogin(this: DocumentType<User>) {
    this.lastLogin = new Date();
    return this.save();
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
