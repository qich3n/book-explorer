import { useState, useEffect } from 'react';

interface BookCardProps {
  title: string;
  author?: string[];
  year?: number;
  coverId?: number;
  bookKey: string; // Changed from 'key' to 'bookKey'
}

interface BookDetails {
  description?: string;
  subjects?: string[];
  firstSentence?: string;
  publishPlaces?: string[];
  loading: boolean;
  error: boolean;
}

export default function BookCard({ title, author, year, coverId, bookKey }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState<BookDetails>({
    loading: false,
    error: false
  });
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Extract work ID from bookKey
  const workId = bookKey.replace('/works/', '');

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!isExpanded || details.description) return;

      setDetails(prev => ({ ...prev, loading: true }));
      try {
        const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
        if (!response.ok) throw new Error('Failed to fetch book details');
        
        const data = await response.json();
        setDetails({
          description: typeof data.description === 'object' ? 
            data.description.value : data.description,
          subjects: data.subjects,
          firstSentence: data.first_sentence?.value,
          publishPlaces: data.publish_places,
          loading: false,
          error: false
        });
      } catch (err) {
        console.error('Error fetching book details:', err);
        setDetails(prev => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchBookDetails();
  }, [isExpanded, workId, details.description]);

  const FallbackCover = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <p className="text-gray-500 text-sm">No cover available</p>
      </div>
    </div>
  );

  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '';

  return (
    <div className="group bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="aspect-[2/3] relative overflow-hidden bg-gray-50">
        {!imageError && coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <FallbackCover />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        {author && author.length > 0 && (
          <p className="text-gray-700 mb-1 line-clamp-1">
            by {author.join(', ')}
          </p>
        )}
        {year && (
          <p className="text-gray-600 text-sm mb-2">
            Published: {year}
          </p>
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 -ml-2 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>

        {isExpanded && (
          <div className="mt-3 border-t pt-3 space-y-4 transition-all duration-300">
            {details.loading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
            
            {details.error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
                Failed to load book details. Please try again later.
              </div>
            )}

            {details.firstSentence && (
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 text-sm">First Sentence:</h4>
                <p className="text-gray-700 text-sm italic">&quot;{details.firstSentence}&quot;</p>
              </div>
            )}
            
            {details.description && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Description:</h4>
                <p className={`text-gray-700 text-sm ${!showFullDescription && 'line-clamp-4'}`}>
                  {details.description}
                </p>
                {details.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-500 hover:text-blue-600 text-xs focus:outline-none"
                  >
                    {showFullDescription ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
            )}

            {details.subjects && details.subjects.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Subjects:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {details.subjects.slice(0, 5).map((subject, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {subject}
                    </span>
                  ))}
                  {details.subjects.length > 5 && (
                    <span className="text-xs text-gray-500">
                      +{details.subjects.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {details.publishPlaces && details.publishPlaces.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">Published in:</h4>
                <p className="text-gray-700 text-sm">
                  {details.publishPlaces.slice(0, 3).join(', ')}
                  {details.publishPlaces.length > 3 && ' and more'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}