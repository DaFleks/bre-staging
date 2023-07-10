import { Schema, model, models } from "mongoose";

const skuSchema = new Schema(
  {
    skuCount: {
      type: Number,
      default: 1000,
    },
  },
  { timestamps: true }
);

const SkuCount = models.SkuCount || model("SkuCount", skuSchema);

export default SkuCount;