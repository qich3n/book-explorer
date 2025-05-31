'use client';

import { useState, useEffect } from 'react';
import { Share2, Heart, BookOpen, ShoppingCart, Star, Eye, Calendar, MapPin } from 'lucide-react';

interface BookCardProps {
  title: string;
  author?: string[];
  year?: number;
  coverId?: number;
  bookKey: string;
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      if (!isExpanded || details.description) return;

      setDetails((prev) => ({ ...prev, loading: true, error: false }));

      try {
        const workRes = await fetch(`https://openlibrary.org/works/${workId}.json`);
        if (!workRes.ok) {
          throw new Error('Failed to fetch main work details');
        }
        const workData = await workRes.json();

        const editionsRes = await fetch(
          `https://openlibrary.org/works/${workId}/editions.json`
        );
        const editionsData = await editionsRes.json();
        const firstEdition = editionsData.entries?.[0] || {};

        const workDescription =
          typeof workData.description === 'object'
            ? workData.description?.value
            : workData.description;

        let editionDescription = '';
        if (typeof firstEdition?.description === 'object') {
          editionDescription = firstEdition.description.value || '';
        } else if (typeof firstEdition?.description === 'string') {
          editionDescription = firstEdition.description;
        }

        const finalDescription =
          (editionDescription?.length || 0) > (workDescription?.length || 0)
            ? editionDescription
            : workDescription;

        setDetails({
          description: finalDescription,
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
  };

  /** Enhanced fallback cover component */
  const FallbackCover = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
      <div className="relative text-center p-6 z-10">
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-white/10 rounded-full blur-lg"></div>
          <BookOpen className="relative w-16 h-16 text-white/70 mx-auto" />
        </div>
        <p className="text-white/60 text-sm font-medium">No cover available</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
      <div className="absolute top-1/3 right-4 w-1.5 h-1.5 bg-white/15 rounded-full"></div>
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
      className={`
        group relative bg-white/5 backdrop-blur-sm rounded-2xl 
        border border-white/10 shadow-glass overflow-hidden
        transition-all duration-500 hover:scale-[1.02] hover:shadow-glass-lg
        hover:border-white/20 animate-slide-up
        ${isHovered ? 'shadow-neon' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Cover Image Section */}
      <div className="relative overflow-hidden">
        <div className="aspect-[2/3] relative bg-slate-800/50">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && coverUrl && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-600 animate-pulse">
              <div className="absolute inset-0 shimmer"></div>
            </div>
          )}
          
          {!imageError && coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${title}`}
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-all duration-700 group-hover:scale-110
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <FallbackCover />
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`
              p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-110
              border border-white/20 hover:border-white/40
              ${isFavorited 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-neon' 
                : 'bg-white/10 text-white hover:bg-white/20'}
            `}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={handleShare}
            className="
              p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 
              backdrop-blur-md transition-all duration-300 hover:scale-110
              border border-white/20 hover:border-white/40
            "
            title="Share book"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => window.open(purchaseLinks.openLibrary, '_blank')}
            className="
              p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 
              backdrop-blur-md transition-all duration-300 hover:scale-110
              border border-white/20 hover:border-white/40
            "
            title="View on Open Library"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Reading indicator */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white border border-white/20">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>4.{Math.floor(Math.random() * 5) + 1}</span>
          </div>
        </div>
      </div>

      {/* Book Info Section */}
      <div className="p-5 relative z-10">
        <div className="mb-4">
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h3>
          
          {author && author.length > 0 && (
            <p className="text-gray-300 mb-1 line-clamp-1 text-sm">
              by {author.join(', ')}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
            {year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{year}</span>
              </div>
            )}
            {details.pageCount && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>{details.pageCount} pages</span>
              </div>
            )}
          </div>
        </div>

        {/* Purchase Links */}
        <div className="flex flex-wrap gap-2 mb-4">
          <a
            href={purchaseLinks.amazon}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-1.5 text-xs
              bg-gradient-to-r from-orange-500/20 to-orange-600/20 
              text-orange-300 border border-orange-500/30
              px-3 py-1.5 rounded-full 
              hover:from-orange-500/30 hover:to-orange-600/30
              hover:scale-105 transition-all duration-300
              backdrop-blur-sm
            "
          >
            <ShoppingCart className="w-3 h-3" />
            Amazon
          </a>
          
          <a
            href={purchaseLinks.bookshop}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-xs bg-gradient-to-r from-green-500/20 to-green-600/20 
              text-green-300 border border-green-500/30
              px-3 py-1.5 rounded-full 
              hover:from-green-500/30 hover:to-green-600/30
              hover:scale-105 transition-all duration-300
              backdrop-blur-sm
            "
          >
            Bookshop
          </a>
          
          <a
            href={purchaseLinks.goodreads}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-xs bg-gradient-to-r from-amber-500/20 to-amber-600/20 
              text-amber-300 border border-amber-500/30
              px-3 py-1.5 rounded-full 
              hover:from-amber-500/30 hover:to-amber-600/30
              hover:scale-105 transition-all duration-300
              backdrop-blur-sm
            "
          >
            Goodreads
          </a>
        </div>

        {/* Expandable Section Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium 
            bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30
            rounded-xl px-4 py-2 transition-all duration-300 hover:scale-[1.02]
            backdrop-blur-sm
          "
        >
          {isExpanded ? 'Show Less' : 'Show More Details'}
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-slide-up">
            {/* Loading indicator for details */}
            {details.loading && (
              <div className="flex items-center justify-center py-6">
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}

            {/* Error State */}
            {details.error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-4 rounded-xl backdrop-blur-sm">
                Failed to load book details. Please try again later.
              </div>
            )}

            {/* Show additional data if present */}
            {!details.loading && !details.error && (
              <div className="space-y-4">
                {details.firstSentence && (
                  <div className="glass-effect rounded-xl p-4 border border-white/5">
                    <h4 className="font-semibold text-purple-300 text-sm mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Opening Line
                    </h4>
                    <p className="text-gray-300 text-sm italic leading-relaxed">
                      &quot;{details.firstSentence}&quot;
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {details.pageCount && (
                    <div className="glass-effect rounded-lg p-3 border border-white/5">
                      <div className="text-gray-400 text-xs mb-1">Pages</div>
                      <div className="text-white font-medium">{details.pageCount}</div>
                    </div>
                  )}

                  {details.publishers && details.publishers.length > 0 && (
                    <div className="glass-effect rounded-lg p-3 border border-white/5">
                      <div className="text-gray-400 text-xs mb-1">Publisher</div>
                      <div className="text-white font-medium text-xs">{details.publishers[0]}</div>
                    </div>
                  )}
                </div>

                {details.description && (
                  <div className="glass-effect rounded-xl p-4 border border-white/5">
                    <h4 className="font-semibold text-blue-300 text-sm mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Description
                    </h4>
                    <p
                      className={`
                        text-gray-300 text-sm leading-relaxed
                        ${!showFullDescription ? 'line-clamp-4' : ''}
                      `}
                    >
                      {details.description}
                    </p>
                    {details.description.length > 300 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-blue-400 hover:text-blue-300 text-xs mt-3 font-medium transition-colors"
                      >
                        {showFullDescription ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </div>
                )}

                {details.subjects && details.subjects.length > 0 && (
                  <div className="glass-effect rounded-xl p-4 border border-white/5">
                    <h4 className="font-semibold text-green-300 text-sm mb-3">
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {details.subjects.slice(0, 5).map((subject, index) => (
                        <span
                          key={index}
                          className="
                            text-xs bg-gradient-to-r from-green-500/20 to-green-600/20
                            text-green-300 border border-green-500/30
                            px-3 py-1 rounded-full 
                            hover:from-green-500/30 hover:to-green-600/30
                            transition-all duration-300 cursor-pointer hover:scale-105
                            backdrop-blur-sm
                          "
                        >
                          {subject}
                        </span>
                      ))}
                      {details.subjects.length > 5 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{details.subjects.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {details.publishPlaces && details.publishPlaces.length > 0 && (
                  <div className="glass-effect rounded-xl p-4 border border-white/5">
                    <h4 className="font-semibold text-pink-300 text-sm mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Published in
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {details.publishPlaces.slice(0, 3).join(', ')}
                      {details.publishPlaces.length > 3 && ' and more'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Menu Fallback */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-effect p-6 rounded-2xl shadow-glass-lg max-w-sm w-full mx-4 border border-white/20 animate-scale-in">
            <h4 className="font-bold text-white mb-6 text-center">Share this book</h4>
            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                📋 Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out "${title}" on Book Explorer!`
                )}&url=${encodeURIComponent(
                  `https://openlibrary.org${bookKey}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                🐦 Share on Twitter
              </a>
            </div>
            <button
              onClick={() => setShowShareMenu(false)}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}