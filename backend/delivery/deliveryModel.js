import mongoose from 'mongoose'


const deliverySchema = mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
}
)

const Delivery = mongoose.model('Delivery', deliverySchema)

export default Delivery
