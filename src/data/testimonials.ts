/* Real, attributable client feedback only. The homepage section stays hidden
   while this list is empty, rather than shipping placeholder quotes that could
   be mistaken for genuine reviews. */
export type Testimonial = { name: string; text: string; role?: string; city?: string };

export const testimonials: Testimonial[] = [];
