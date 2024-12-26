import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation/navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "@/components/welcome/msg";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-color_blue_normal to-blue-200 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};
