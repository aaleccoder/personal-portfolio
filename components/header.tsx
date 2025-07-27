import { LanguageSwitcher } from "./LanguageSwitcher";
import { ModeToggle } from "./theme-toogle";
import { Button } from "./ui/button";

export const Header = () => {

  return (
    <header className="fixed top-0 right-0 z-50 w-full">
      <nav className="flex flex-row justify-between p-4 items-center w-full">
        <a href="/">
          <p className="font-bold uppercase">Daeralysdev</p>
        </a>

        <div className="space-x-4 flex flex-row items-center">
          {/* <ModeToggle /> */}
          <LanguageSwitcher />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="icon" className="cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(0) matrix(-1, 0, 0, 1, 0, 0)" }}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 6H20M4 12H14M4 18H9"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {menu.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <a href={item.href}>{item.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </nav>
    </header>
  );
};
