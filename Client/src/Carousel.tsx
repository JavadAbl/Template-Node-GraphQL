import { useState, useRef, useEffect } from "react";

const Carousel = ({ items, dir = "ltr" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragThreshold = 50; // Minimum drag distance in pixels
  const isRTL = dir === "rtl";

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current?.parentElement) {
        setContainerWidth(carouselRef.current.parentElement.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle drag start
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setDragOffset(0);

    // Disable transition during drag
    if (carouselRef.current) {
      carouselRef.current.style.transition = "none";
    }
  };

  // Handle drag move
  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;

    const currentX = e.pageX || e.touches[0].pageX;
    // In RTL, reverse the drag direction
    const offset = isRTL ? startX - currentX : currentX - startX;
    setDragOffset(offset);

    // Calculate position with RTL support
    const basePosition = isRTL
      ? currentIndex * containerWidth
      : -currentIndex * containerWidth;

    carouselRef.current.style.transform = `translateX(${
      basePosition + offset
    }px)`;
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging || !carouselRef.current || containerWidth === 0) {
      setIsDragging(false);
      return;
    }

    setIsDragging(false);
    carouselRef.current.style.transition = "transform 0.3s ease";

    // For RTL, we need to invert the direction logic
    if (Math.abs(dragOffset) > dragThreshold) {
      if (isRTL) {
        if (dragOffset > 0 && currentIndex < items.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset < 0 && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        } else {
          resetPosition();
        }
      } else {
        if (dragOffset < 0 && currentIndex < items.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else if (dragOffset > 0 && currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        } else {
          resetPosition();
        }
      }
    } else {
      resetPosition();
    }
  };

  // Reset to current position
  const resetPosition = () => {
    if (carouselRef.current) {
      const position = isRTL
        ? currentIndex * containerWidth
        : -currentIndex * containerWidth;
      carouselRef.current.style.transform = `translateX(${position}px)`;
    }
  };

  // Navigation handlers with RTL support
  const goToNext = () => {
    if (currentIndex < items.length - 1 && !isDragging) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0 && !isDragging) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Apply transform when currentIndex changes
  useEffect(() => {
    if (carouselRef.current && containerWidth > 0) {
      carouselRef.current.style.transition = "transform 0.3s ease";
      const position = isRTL
        ? currentIndex * containerWidth
        : -currentIndex * containerWidth;
      carouselRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [currentIndex, containerWidth, isRTL]);

  // Reset position when container width changes
  useEffect(() => {
    if (containerWidth > 0) {
      resetPosition();
    }
  }, [containerWidth, isRTL]);

  // Cleanup drag state
  useEffect(() => {
    const handleGlobalEnd = () => {
      if (isDragging) handleDragEnd();
    };

    window.addEventListener("mouseup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);
    window.addEventListener("touchcancel", handleGlobalEnd);

    return () => {
      window.removeEventListener("mouseup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
      window.removeEventListener("touchcancel", handleGlobalEnd);
    };
  }, [isDragging, isRTL]);

  if (items.length === 0) return null;

  // Determine button positions and functionality based on direction
  const prevButtonPosition = isRTL ? "right" : "left";
  const nextButtonPosition = isRTL ? "left" : "right";
  const prevAction = isRTL ? goToNext : goToPrev;
  const nextAction = isRTL ? goToPrev : goToNext;
  const prevDisabled = isRTL
    ? currentIndex === items.length - 1
    : currentIndex === 0;
  const nextDisabled = isRTL
    ? currentIndex === 0
    : currentIndex === items.length - 1;

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4" dir={dir}>
      {/* Navigation Buttons with RTL support */}
      <button
        onClick={prevAction}
        disabled={prevDisabled || isDragging}
        className={`absolute ${prevButtonPosition}-2 md:${prevButtonPosition}-4 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 rounded-full shadow-lg transition-all duration-200
          ${
            prevDisabled || isDragging
              ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-800 hover:bg-gray-100 opacity-80 hover:opacity-100"
          }`}
        aria-label={isRTL ? "Next slide" : "Previous slide"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextAction}
        disabled={nextDisabled || isDragging}
        className={`absolute ${nextButtonPosition}-2 md:${nextButtonPosition}-4 top-1/2 transform -translate-y-1/2 z-10 p-2 md:p-3 rounded-full shadow-lg transition-all duration-200
          ${
            nextDisabled || isDragging
              ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-800 hover:bg-gray-100 opacity-80 hover:opacity-100"
          }`}
        aria-label={isRTL ? "Previous slide" : "Next slide"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel Track with RTL support */}
      <div
        className={`overflow-hidden rounded-xl cursor-grab active:cursor-grabbing ${
          isRTL ? "rtl-carousel" : ""
        }`}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={carouselRef}
          className="flex"
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleDragMove}
          style={{
            width: `${items.length * 100}%`,
            // For RTL, reverse the flex direction using CSS transform
            transform: isRTL ? "scaleX(-1)" : "none",
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: containerWidth || "100%" }}
            >
              <div
                className="bg-white rounded-xl shadow-lg overflow-hidden h-80 md:h-96 flex flex-col transition-transform duration-300 hover:shadow-xl"
                // Apply reverse transform to content in RTL to fix mirroring
                style={isRTL ? { transform: "scaleX(-1)" } : {}}
              >
                <div className="h-48 md:h-64 overflow-hidden">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    // Fix image mirroring in RTL
                    style={isRTL ? { transform: "scaleX(-1)" } : {}}
                  />
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 flex-grow">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-indigo-600">
                      {isRTL
                        ? `${items.length - currentIndex} / ${items.length}`
                        : `${currentIndex + 1} / ${items.length}`}
                    </span>
                    <div className="flex space-x-1">
                      {items.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setCurrentIndex(dotIndex)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            dotIndex === currentIndex
                              ? "bg-indigo-600 w-3"
                              : "bg-gray-300"
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
