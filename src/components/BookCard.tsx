'use client';

import { useState, useEffect } from 'react';
import { Share2, Heart, BookOpen, ShoppingCart } from 'lucide-react';

interface BookCardProps {
  title: string;
  author?: string[];
  year?: number;
  coverId?: number;
  bookKey: string;  // e.g. "/works/OL1234W"
}

interface BookDetails {
  description?: string;
  subjects?: string[];
  firstSentence?: string;
  publishPlaces?: string[];
  isbn?: string[];
  pageCount?: number;
  publishers?: string[];
  loading: boolean;
  error: boolean;
}

interface BookPurchaseLinks {
  amazon: string;
  bookshop: string;
  openLibrary: string;
  goodreads: string;
}

/** 
 * Generates store links by combining title + first author. 
 * Optionally includes ISBN if found.
 */
function generatePurchaseLinks(
  title: string,
  author?: string[],
  isbn?: string
): BookPurchaseLinks {
  const searchQuery = `${title} ${author?.[0] || ''}`.trim();
  const encodedQuery = encodeURIComponent(searchQuery);
  const isbnQuery = isbn ? `&isbn=${isbn}` : '';

  return {
    amazon: `https://www.amazon.com/s?k=${encodedQuery}${isbnQuery}&i=stripbooks`,
    bookshop: `https://bookshop.org/search?keywords=${encodedQuery}`,
    openLibrary: `https://openlibrary.org/search?q=${encodedQuery}`,
    goodreads: `https://www.goodreads.com/search?q=${encodedQuery}`,
  };
}

export default function BookCard({
  title,
  author,
  year,
  coverId,
  bookKey,
}: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const [details, setDetails] = useState<BookDetails>({
    loading: false,
    error: false,
  });

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Extract the Work ID (remove "/works/")
  const workId = bookKey.replace('/works/', '');

  /** 
   * Fetch more data about this book from:
   * 1) The 'works' endpoint
   * 2) The 'editions' endpoint
   * Then merge them to get the most complete description possible.
   */
  useEffect(() => {
    async function fetchBookDetails() {
      // Only fetch when expanded for the first time, or if we have no description yet
      if (!isExpanded || details.description) return;

      setDetails((prev) => ({ ...prev, loading: true, error: false }));

      try {
        // 1. Fetch from the works endpoint
        const workRes = await fetch(`https://openlibrary.org/works/${workId}.json`);
        if (!workRes.ok) {
          throw new Error('Failed to fetch main work details');
        }
        const workData = await workRes.json();

        // 2. Fetch from the editions endpoint
        const editionsRes = await fetch(
          `https://openlibrary.org/works/${workId}/editions.json`
        );
        const editionsData = await editionsRes.json();
        const firstEdition = editionsData.entries?.[0] || {};

        // --------------------------
        // Determine the description
        // --------------------------
        const workDescription =
          typeof workData.description === 'object'
            ? workData.description?.value
            : workData.description; // could be string or undefined

        // Some editions might have a 'description' field as well
        let editionDescription = '';
        if (typeof firstEdition?.description === 'object') {
          editionDescription = firstEdition.description.value || '';
        } else if (typeof firstEdition?.description === 'string') {
          editionDescription = firstEdition.description;
        }

        // Decide which description to keep:
        // pick the one that's longer or more complete
        const finalDescription =
          (editionDescription?.length || 0) > (workDescription?.length || 0)
            ? editionDescription
            : workDescription;

        // 3. Build the details object
        setDetails({
          description: finalDescription, // can be undefined or empty string if none
          subjects: workData.subjects,
          firstSentence: workData.first_sentence?.value,
          publishPlaces: workData.publish_places,
          isbn: firstEdition.isbn_13 || firstEdition.isbn_10,
          pageCount: firstEdition.number_of_pages,
          publishers: firstEdition.publishers,
          loading: false,
          error: false,
        });
      } catch (err) {
        console.error('Error fetching book details:', err);
        setDetails((prev) => ({ ...prev, loading: false, error: true }));
      }
    }

    fetchBookDetails();
  }, [isExpanded, workId, details.description]);

  /** 
   * Attempt to share via the Web Share API; fallback to custom share menu 
   */
  const handleShare = async () => {
    const shareUrl = `https://openlibrary.org${bookKey}`;
    const shareText = `Check out "${title}" by ${author?.[0] || 'Unknown Author'}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to custom menu
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  /** Copy the book link to clipboard */
  const copyToClipboard = () => {
    const shareUrl = `https://openlibrary.org${bookKey}`;
    navigator.clipboard.writeText(shareUrl);
    // Optionally show a toast notification
  };

  /** Fallback cover component if the cover fails to load */
  const FallbackCover = () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center p-4">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">No cover available</p>
      </div>
    </div>
  );

  /** Construct the cover URL if we have a coverId */
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : '';

  /** Generate purchase links for Amazon, Bookshop, Goodreads, etc. */
  const purchaseLinks = generatePurchaseLinks(title, author, details.isbn?.[0]);

  return (
    <div
      className="
        group bg-white rounded-lg shadow 
        hover:shadow-lg transition-shadow duration-300 overflow-hidden 
        border border-gray-200
      "
    >
      {/* Cover Image */}
      <div className="relative">
        <div className="aspect-[2/3] relative overflow-hidden bg-gray-50">
          {!imageError && coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${title}`}
              className="
                absolute inset-0 w-full h-full object-cover
                transform group-hover:scale-105 transition-transform duration-300
              "
              onError={() => setImageError(true)}
            />
          ) : (
            <FallbackCover />
          )}
        </div>

        {/* Favorite & Share Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`
              p-2 rounded-full backdrop-blur-sm transition-all hover:scale-105
              ${isFavorited ? 'bg-red-500 text-white' : 'bg-white/70 text-gray-600 hover:bg-white'}
            `}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="
              p-2 rounded-full bg-white/70 text-gray-600 hover:bg-white 
              backdrop-blur-sm transition-all hover:scale-105
            "
            title="Share book"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3
          className="
            font-semibold text-gray-900 text-lg mb-2 line-clamp-2 
            group-hover:text-blue-600 transition-colors
          "
        >
          {title}
        </h3>
        {author && author.length > 0 && (
          <p className="text-gray-700 mb-1 line-clamp-1">by {author.join(', ')}</p>
        )}
        {year && (
          <p className="text-gray-600 text-sm mb-2">Published: {year}</p>
        )}

        {/* Purchase Links */}
        <div className="flex flex-wrap gap-2 mt-3">
          <a
            href={purchaseLinks.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1 text-sm 
              bg-orange-100 text-orange-600 
              px-3 py-1 rounded-full 
              hover:bg-orange-200 transition-colors
            "
          >
            <ShoppingCart className="w-4 h-4" />
            Amazon
          </a>
          <a
            href={purchaseLinks.bookshop}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm bg-green-100 text-green-600 
              px-3 py-1 rounded-full 
              hover:bg-green-200 transition-colors
            "
          >
            Bookshop
          </a>
          <a
            href={purchaseLinks.goodreads}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm bg-amber-100 text-amber-700 
              px-3 py-1 rounded-full 
              hover:bg-amber-200 transition-colors
            "
          >
            Goodreads
          </a>
        </div>

        {/* Expandable Section Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            mt-3 text-blue-500 hover:text-blue-600 text-sm font-medium 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            rounded-md px-2 py-1 -ml-2 transition-colors
          "
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div
            className="
              mt-3 border-t pt-3 space-y-4 
              transition-all duration-300
            "
          >
            {/* Loading indicator for details */}
            {details.loading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Error State */}
            {details.error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
                Failed to load book details. Please try again later.
              </div>
            )}

            {/* Show additional data if present */}
            {!details.loading && !details.error && (
              <>
                {details.firstSentence && (
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Opening Line:
                    </h4>
                    <p className="text-gray-700 text-sm italic">
                      &quot;{details.firstSentence}&quot;
                    </p>
                  </div>
                )}

                {details.pageCount && (
                  <p className="text-gray-700 text-sm">
                    Pages: {details.pageCount}
                  </p>
                )}

                {details.publishers && details.publishers.length > 0 && (
                  <p className="text-gray-700 text-sm">
                    Publisher: {details.publishers[0]}
                  </p>
                )}

                {details.description && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 text-sm">
                      Description:
                    </h4>
                    <p
                      className={`
                        text-gray-700 text-sm
                        ${!showFullDescription ? 'line-clamp-4' : ''}
                      `}
                    >
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
                    <h4 className="font-medium text-gray-900 text-sm">
                      Subjects:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {details.subjects.slice(0, 5).map((subject, index) => (
                        <span
                          key={index}
                          className="
                            text-xs bg-blue-50 text-blue-600 
                            px-2 py-1 rounded-full 
                            hover:bg-blue-100 transition-colors 
                            cursor-pointer
                          "
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
                    <h4 className="font-medium text-gray-900 text-sm">
                      Published in:
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {details.publishPlaces.slice(0, 3).join(', ')}
                      {details.publishPlaces.length > 3 && ' and more'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Share Menu Fallback */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h4 className="font-semibold mb-4">Share this book</h4>
            <div className="space-y-2">
              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
              >
                Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out "${title}" on Book Explorer!`
                )}&url=${encodeURIComponent(
                  `https://openlibrary.org${bookKey}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
              >
                Share on Twitter
              </a>
            </div>
            <button
              onClick={() => setShowShareMenu(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
