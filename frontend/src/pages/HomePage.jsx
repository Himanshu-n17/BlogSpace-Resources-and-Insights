import React, { useState, useMemo } from "react";
import { BlogProvider } from "../contexts/BlogContext";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { CategoryFilter } from "../components/CategoryFilter";
import { BlogCard } from "../components/BlogCard";
import { BlogPostModal } from "../components/BlogPostModal";
import { CreatePostModal } from "../components/CreatePostModal";
import { EditPostModal } from "../components/EditPostModal";
import { MyPostsModal } from "../components/MyPostsModal";
import { useBlog } from "../contexts/BlogContext";
import { ChevronDown } from "lucide-react";

function HomePageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showMyPostsModal, setShowMyPostsModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const { posts, deletePost } = useBlog();
  const { getAuthToken } = useAuth();

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered;
  }, [posts, searchQuery, selectedCategory]);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const handleLoadMore = () => {
    const newVisibleCount = visiblePosts + 3;
    setVisiblePosts(newVisibleCount);
    if (newVisibleCount >= filteredPosts.length) {
      setShowLoadMore(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  const handleDeletePost = (postId) => {
    setShowDeleteConfirm(postId);
  };

  const confirmDeletePost = () => {
    if (showDeleteConfirm) {
      const token = getAuthToken(); // Get token here
      deletePost(showDeleteConfirm, token); // Pass token explicitly
      setShowDeleteConfirm(null);
    }
  };

  // Reset visible posts when filters change
  React.useEffect(() => {
    setVisiblePosts(6);
    setShowLoadMore(filteredPosts.length > 6);
  }, [filteredPosts.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreatePost={() => setShowCreateModal(true)}
        onMyPosts={() => setShowMyPostsModal(true)}
      />

      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              onClick={setSelectedPost}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 mb-8">
              {searchQuery || selectedCategory
                ? "Try adjusting your search or filter criteria"
                : "Be the first to create a post!"}
            </p>
          </div>
        )}

        {showLoadMore && filteredPosts.length > visiblePosts && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 py-3 border border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Load more
            </button>
          </div>
        )}
      </main>

      <BlogPostModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <EditPostModal
        post={editingPost}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingPost(null);
        }}
      />

      <MyPostsModal
        isOpen={showMyPostsModal}
        onClose={() => setShowMyPostsModal(false)}
        onEditPost={handleEditPost}
        onViewPost={setSelectedPost}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Post
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeletePost}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <BlogProvider>
      <HomePageContent />
    </BlogProvider>
  );
}

export default HomePage;
