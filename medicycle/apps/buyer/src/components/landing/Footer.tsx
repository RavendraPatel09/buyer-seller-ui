export function Footer() {
  return (
    <footer className="bg-background relative z-10 border-t border-border/20 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <h3 className="text-2xl font-bold text-primary mb-4">MediCycle</h3>
          <p className="text-muted-foreground max-w-sm">The operating system for modern healthcare facilities. Designed for speed, built for reliability.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Legal</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-border/20 text-center text-muted-foreground text-sm flex flex-col md:flex-row items-center justify-between">
        <p>© 2026 MediCycle. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground">Twitter</a>
          <a href="#" className="hover:text-foreground">LinkedIn</a>
          <a href="#" className="hover:text-foreground">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
