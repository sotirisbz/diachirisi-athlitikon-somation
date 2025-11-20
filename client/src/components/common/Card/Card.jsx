export default function Card({
  children,
  classname = "",
  title,
  subtitle,
  action,
  noPadding = false,
  hoverable = false,
}) {
  const hoverClass = hoverable
    ? "hover:shadow-lg transition-shadow duration-200"
    : "";

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden ${hoverClass} ${classname}`}
    >
      {(title || action) && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
