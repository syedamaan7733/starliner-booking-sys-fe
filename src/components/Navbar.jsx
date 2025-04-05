import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  // Effect for handling scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-50 ${
        scrolled ? "bg-background shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="./logo2.svg"
                className="max-w-[6em] md:max-w-[8em] lg:max-w-[10em]"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              onClick={() => navigate("/")}
              className={`transition-all duration-200 font-medium hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-secondary"
              }`}
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => navigate("/")}
              className={`transition-all duration-200 font-medium hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-secondary"
              }`}
            >
              Bookings
            </a>
            <a
              href="#"
              className={`transition-all duration-200 font-medium hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-secondary"
              }`}
            >
              Contact
            </a>
            {!isAuthenticated && (
              <Button onClick={() => navigate("/auth")} size="sm">
                Sign In Now
              </Button>
            )}
          </div>

          {/* Mobile Menu Button with Sheet from shadcn */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`p-0 ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-4 mt-6">
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                  <Button className="mt-2">Get Started</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
