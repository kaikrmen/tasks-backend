import { model, Schema } from 'mongoose';
import { TaskInterface } from './../interfaces/TaskInterface';

const taskSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   isDone: {
      type: Boolean,
      required: true,
      default: false
   },
   userId: {
      type: String,
      required: true
   },
   userName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   }
},
   { timestamps: true }
)
export default model<TaskInterface>('TaskModel', taskSchema);