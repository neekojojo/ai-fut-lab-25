
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <div className="absolute inset-0 bg-primary/30 rounded-xl blur-3xl -z-10 animate-pulse opacity-70"></div>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
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
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default ImageGallery;
