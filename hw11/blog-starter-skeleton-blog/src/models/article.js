import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const articleSchema = mongoose.Schema({
  title: String,
  tags: [String],
  content: String,
}, options);
export const Article = mongoose.model('Article', articleSchema);
