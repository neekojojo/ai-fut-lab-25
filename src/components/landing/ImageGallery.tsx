
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Trophy, Medal, Target } from 'lucide-react';

interface ImageGalleryProps {
  images?: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  // Replacement for missing images - visual elements
  const visualElements = [
    { 
      icon: <Trophy className="w-16 h-16 text-primary/70" />,
      color: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/5"
    },
    { 
      icon: <Medal className="w-16 h-16 text-primary/70" />,
      color: "bg-gradient-to-br from-blue-500/20 to-blue-600/5" 
    },
    { 
      icon: <Target className="w-16 h-16 text-primary/70" />,
      color: "bg-gradient-to-br from-green-500/20 to-green-600/5" 
    }
  ];

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div className="absolute inset-0 bg-primary/30 rounded-xl blur-3xl -z-10 animate-pulse opacity-70"></div>
      <Carousel className="w-full">
        <CarouselContent>
          {images && images.length > 0 ? (
            // Render actual images if provided
            images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="relative p-1">
                  <div className="overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:scale-[1.01] hover:border-primary/20">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full transition-transform hover:scale-110 duration-700"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            // Render visual elements when no images
            visualElements.map((element, index) => (
              <CarouselItem key={index} className="md:basis-1/1">
                <div className="relative p-1">
                  <div className="overflow-hidden rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm transition-all hover:scale-[1.01] hover:border-primary/20">
                    <div className={`relative aspect-[16/9] overflow-hidden rounded-lg ${element.color} flex items-center justify-center`}>
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-b from-primary/20 to-transparent skew-x-12 animate-light-rays" 
                             style={{ transformOrigin: 'top center' }}></div>
                      </div>
                      <div className="animate-float">
                        {element.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default ImageGallery;
