import { auth } from "@clerk/nextjs/server";

import { getCurrentTextbookData, getMyAssignments, getPublicData, getUserData } from "@/lib/action/mongoIO";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LessonCard } from "../components/lessonInfo";
import { Type2Tag } from "@/lib/db/db";
import { Separator } from "@/components/ui/separator";
import { getBeijingTime } from "@/lib/tools";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import { redirect } from "next/navigation";

import { Header } from "@/components/student-nav";
import { getCurrentTextbook } from "@/lib/action/kv";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default async function Home() {



    return (

        <div className="h-full flex flex-col  bg-[#F5F5F5]">
            通过'/[课程类型]/[课程Id]'进入课程
        </div>
    )
}


