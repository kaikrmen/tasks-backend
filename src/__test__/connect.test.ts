// connect.test.ts

import mongoose from 'mongoose';
import { connect } from './../db/connect';

jest.mock('mongoose');

describe('MongoDB Connection', () => {
  it('connects to MongoDB successfully', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValue('Connected to MongoDB');

    await connect();

    expect(mongoose.connect).toHaveBeenCalled();
  });

  it('handles connection errors', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (mongoose.connect as jest.Mock).mockRejectedValue(new Error('Failed to connect to MongoDB'));

    await connect();

    expect(console.error).toHaveBeenCalledWith('Error connecting to MongoDB:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
