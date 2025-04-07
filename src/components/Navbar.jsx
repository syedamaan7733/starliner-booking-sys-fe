import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import { useNavigate } from "react-router-dom";
import { Menu, MoreVertical } from "lucide-react";
import { Alert } from "./ui/alert";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [outAlert, setOutAlert] = useState(false);
  const { logout } = useAuth();
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

  function handleLogOut() {
    logout();
    navigate("/auth");
  }

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
                src="/logo2.svg"
                className="max-w-[6em] md:max-w-[8em] lg:max-w-[10em]"
              />
            </a>
          </div>
          {outAlert && (
            <Alert
              trigger={handleLogOut}
              state={outAlert}
              setState={setOutAlert}
              id={"Log Out"}
              title={"Log Out"}
              message={"If you want to logout click the Logout."}
            />
          )}

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
              onClick={() =>
                isAuthenticated ? navigate("/my-bookings") : navigate("/auth")
              }
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
            {!isAuthenticated ? (
              <Button
                className="mt-2"
                onClick={() => navigate("/auth")}
                size="sm"
              >
                Sign In Now
              </Button>
            ) : (
              <Button
                className="mt-2 bg-transparent text-red-600 cursor-pointer font-bold hover:bg-white/50  "
                onClick={() => setOutAlert(!outAlert)}
                size="sm"
              >
                Log out
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
                    scrolled ? "text-foreground" : "text-black"
                  }`}
                >
                  <Menu />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-4 mt-10 pl-4">
                  <a
                    href="#"
                    onClick={() => navigate("/")}
                    className="text-foreground cursor-pointer hover:text-secondary border-b-2 border-black/20 font-bold transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      isAuthenticated
                        ? navigate("/my-bookings")
                        : navigate("/auth")
                    }
                    className="text-foreground cursor-pointer hover:text-secondary border-b-2 border-black/20 font-bold transition-colors"
                  >
                    Bookings
                  </a>
                  <a
                    href="#"
                    className="text-foreground cursor-pointer hover:text-secondary border-b-2 border-black/20 font-bold transition-colors"
                  >
                    Contact
                  </a>
                  {!isAuthenticated ? (
                    <Button
                      className="mt-2"
                      onClick={() => navigate("/auth")}
                      size="sm"
                    >
                      Sign In Now
                    </Button>
                  ) : (
                    <Button
                      className="mt-2 bg-transparent text-red-600 cursor-pointer font-bold hover:bg-white/50  "
                      onClick={() => setOutAlert(!outAlert)}
                      size="sm"
                    >
                      Log out
                    </Button>
                  )}
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
