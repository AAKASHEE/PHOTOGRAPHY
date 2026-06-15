"use client"

export default function JournalPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-medium">
        Coming Soon
      </p>
      <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium mb-6">
        Journal
      </h1>
      <div className="w-16 h-px bg-foreground/30 mx-auto mb-6" />
      <p className="text-muted-foreground text-base md:text-lg max-w-sm">
        Stories, behind the scenes & moments — currently in the works.
      </p>
    </div>
  )
}
