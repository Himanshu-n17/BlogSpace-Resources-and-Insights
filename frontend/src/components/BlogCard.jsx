import React from "react";
import { format } from "date-fns";
import { mockCategories } from "../data/mockData";
import { ExternalLink, Edit3, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useBlog } from "../contexts/BlogContext";

export const BlogCard = ({ post, onClick, onEdit, onDelete }) => {
  const { user, isAuthenticated, getAuthToken } = useAuth();
  const { canEditPost } = useBlog();
  const categoryInfo = mockCategories.find((cat) => cat.name === post.category);
  const canEdit = isAuthenticated && canEditPost(post, user);

  const handleEdit = (e) => {
    e.stopPropagation();
    const token = getAuthToken();
    onEdit(post,token);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const token = getAuthToken();
    onDelete(post._id, token); // ✅ Use the already retrieved token
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(post)}
    >
      <div className="relative overflow-hidden">
        <img
          src={post.url}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              categoryInfo?.color || "bg-gray-100 text-gray-800"
            }`}
          >
            {post.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {canEdit && (
            <>
              <button
                onClick={handleEdit}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50"
                title="Edit post"
              >
                <Edit3 className="h-4 w-4 text-blue-600" />
              </button>
              <button
                onClick={handleDelete}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                title="Delete post"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </>
          )}
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ExternalLink className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {format(post.createdAt, "dd MMM yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
