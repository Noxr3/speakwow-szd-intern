import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { MyLessons } from "./myLessons";
import { getUserData } from "@/lib/action/mongoIO";
import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import { IconProfile } from "@/components/ui/icons";
import { GraduationCapIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/dist/server/api-utils";

export default async function SideBar() {

    return (
        <div className="h-full p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-6 ">
                <div className="w-full text-xl font-semibold" >
                    <Link href="/">
                        <div className="flex flex-row items-center gap-2">
                            <Avatar className="h-9 p-0.5">
                                <AvatarImage
                                    src={`/logo.png`}
                                    alt={'speakwow'}
                                />
                                <AvatarFallback>🐸</AvatarFallback>
                            </Avatar>
                            <span className="inline text-xl">开口蛙</span>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
             
            </div>
            <div className="bottom-4 w-full flex flex-col gap-2">

                <Card className="p-2 w-full flex flex-col gap-2 justify-between items-center">
                    <div className="flex flex-row gap-2 py-2 justify-between w-full">
                        <div className="flex flex-row gap-2 px-2">
                            <SignedIn>
                                <UserButton appearance={{
                                    elements: {
                                        userButtonPopoverCard: {
                                            pointerEvents: "all"
                                        },
                                        // add your other custom props
                                    },
                                }} />
                            </SignedIn>
                           
                        </div>
                        <div>
                            <Badge variant="outline">
                                💎 100
                            </Badge>
                        </div>
                    </div>
                    

                </Card>


                <Card className=" p-2 w-full flex flex-col gap-2 bg-muted">

                    <div className="w-full flex flex-row justify-between z-10 items-center">
                        <OrganizationSwitcher appearance={{
                            elements: {
                                organizationSwitcherPopoverCard: {
                                    pointerEvents: 'initial',
                                },
                                // add your other custom props
                            },
                        }} />
                                             {
                     
                    }
                    </div>
                
                </Card>
            </div>
        </div>
        </div>
    )
}