import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
    },
    business_name: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    bank_code: { type: String },
    account_number: { type: String },
    password: {
      type: String,
      required: true,
    },
    isMerchant: {
      type: Boolean,
      required: true,
      default: false,
    },
    account_status: { type: Boolean, required: true, default: false },
    subaccount_id: { type: String },
    split_value: { type: Number, default: 0.097 },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
