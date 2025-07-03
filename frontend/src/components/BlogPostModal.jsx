import React from "react";
import { format } from "date-fns";
import { X, Calendar, User, Tag } from "lucide-react";
import { mockCategories } from "../data/mockData";

export const BlogPostModal = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  const categoryInfo = mockCategories.find((cat) => cat.name === post.category);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                categoryInfo?.color || "bg-gray-100 text-gray-800"
              }`}
            >
              {post.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={post.url}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6"
          />

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="font-medium text-gray-900">
                      {post.author.name}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{format(post.createdAt, "MMMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <Tag className="h-4 w-4 text-gray-400" />
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
