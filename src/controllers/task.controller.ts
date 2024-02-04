import {Response, Request} from 'express';
import TaskModel from './../model/TaskModel';
import {TaskInterface} from './../interfaces/TaskInterface';



export const createTask = async (req: Request, res: Response) => {
    try {
        
        const body = req.body as Pick<TaskInterface, 'name' | 'description' | 'isDone' | 'userId' | 'userName' | 'email' >


        if (!body.userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        if (!body.name || !body.description) {
            return res.status(400).json({ message: 'Fields are required' });
        }
        

        const task = new TaskModel({
            name: body.name,
            description: body.description,
            isDone: body.isDone || false, 
            userId: body.userId,
            userName: body.userName,
            email: body.email
        });

        const newTask = await task.save();
        res.status(201).json({ message: 'Task added', task: newTask});
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'Error while creating the task' });
    }
}


export const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId as string;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = 10; 
        const skip = (page - 1) * limit;

        if (!userId) {
            return res.status(400).json({message: 'userId is required'});
        }

        const tasks = await TaskModel.find({ userId: userId })
            .sort({ createdAt: -1 }) 
            .skip(skip) 
            .limit(limit); 

        if (!tasks) {
            return res.status(404).json({ message: 'User has no tasks' });
        }
    
        const totalTasks = await TaskModel.countDocuments({ userId: userId });
        
        res.status(200).json({
            tasks: tasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit), 
            totalTasks: totalTasks
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: 'Error while retrieving the tasks'});
    }
}


export const getTask = async (req: Request, res: Response) => {
    try {

        const { userId } = req.query;
        const { id: taskId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }
        
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        const task = await TaskModel.findOne({ _id: taskId, userId: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error while retrieving the task'});
    }
}


export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId as string; 
        const updates = req.body;

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }


        const allowedUpdates = ['name', 'description']; 
        const actualUpdates = Object.keys(updates)
          .filter(key => allowedUpdates.includes(key) && updates[key] !== null)
          .reduce((acc, key) => ({ ...acc, [key]: updates[key] }), {});

        if (Object.keys(actualUpdates).length === 0) {
            return res.status(400).json({ message: 'No valid updates provided' });
        }

        const task = await TaskModel.findOneAndUpdate(
            { _id: taskId, userId: userId }, 
            actualUpdates,
            { new: true } 
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized' });
        }

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while updating the task' });
    }
};


export const toggleTaskCompletion = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId as string; 

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const task = await TaskModel.findOne({ _id: taskId, userId: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized' });
        }

        task.isDone = !task.isDone;
        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error while toggling the task completion status' });
    }
};


export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.query.userId as string; // Asume que el userId se envía como un parámetro de query

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const task = await TaskModel.findOne({ _id: taskId, userId: userId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found or user not authorized to delete' });
        }

        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        console.error(error); 
        res.status(500).json({message: 'Error while deleting the task'});
    }
};
