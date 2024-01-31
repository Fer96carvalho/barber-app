"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/side-menu";

interface BarbershopInfoProps{
    barbershop: Barbershop
}

const BarbershopInfo = ({barbershop}: BarbershopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () =>{
        router.replace("/");
    }
    
    return ( 
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 top-4 left-4 absolute ">
                    <ChevronLeftIcon />
                </Button>
                

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute ">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>

                <Image src={barbershop.imageUrl} className="opacity-85" fill alt={barbershop.name} style={{
                    objectFit: "cover"
                }}/>
            </div>
            <div className="px-5 pt-3 pb-6 border-b border-solid border-primary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon  className="fill-secondary text-primary" size={18}/>
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <StarIcon  className="fill-secondary text-primary" size={18}/>
                    <p className="text-sm">5.0 (879 avaliações)</p>
                </div>
            </div>
        </div>
     );
}
 
export default BarbershopInfo;