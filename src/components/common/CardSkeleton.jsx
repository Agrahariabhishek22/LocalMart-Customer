const Skeleton = () => {
    return (
      <div className="w-64 p-4 bg-white shadow-md rounded-lg animate-pulse dark:bg-gray-800">
        {/* Image Skeleton */}
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
        
        {/* Text Skeleton */}
        <div className="mt-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  };
  
  const CardSkeleton = ({ count = 6 }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 dark:bg-background-dark">
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  };
  
  export default CardSkeleton;