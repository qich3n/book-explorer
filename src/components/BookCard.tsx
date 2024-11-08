
interface BookCardProps {
  title: string;
  author?: string[];
  year?: number;
  coverId?: number;
}

export default function BookCard({ title, author, year, coverId }: BookCardProps) {
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://via.placeholder.com/200x300?text=No+Cover';

  return (
    <div className="flex flex-col h-full p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full pb-[133%] mb-4 bg-gray-100 rounded-md overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl}
          alt={`Cover of ${title}`}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
          }}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        {author && author.length > 0 && (
          <p className="text-gray-600 mb-1 line-clamp-1">{author[0]}</p>
        )}
        {year && <p className="text-gray-500 text-sm">First published: {year}</p>}
      </div>
    </div>
  );
}