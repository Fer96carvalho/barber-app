"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";

interface ServiceItemProps {
    barbershop: Barbershop;
    service: Service;
    isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    const [hour, setHour] = useState<string | undefined>();

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    };

    const handleHourClick = (time: string) => {
        setHour(time);
    };

    const handleBookingclick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
        // TODO: abrir modal de agendamento
    };

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date]);

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image
                            className="rounded-lg"
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex items-centes justify-between mt-3">
                            <p className="text-primary text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price))}
                            </p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className="text-primary"
                                        onClick={handleBookingclick}
                                    >
                                        Reservar
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            fromDate={new Date()}
                                            locale={ptBR}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                },
                                            }}
                                        />
                                    </div>
                                    {/* Mostrar lista de horarios apenas se alguma data estiver selecionada*/}

                                    {date && (
                                        <div className="flex gap-3 overflow-x-auto px-5 py-6 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                                            {timeList.map((time) => (
                                                <Button
                                                    onClick={() => handleHourClick(time)}
                                                    variant={hour === time ? "default" : "outline"}
                                                    key={time}
                                                    className="rounded-full"
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="flex flex-col gap-2 p-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <p className=" text-sm font-bold">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(Number(service.price))}
                                                    </p>
                                                </div>
                                                {date &&(
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Data</h3>
                                                        <h4 className="text-sm text-gray-400">{format(date,"dd 'de' MMMM",{
                                                            locale: ptBR
                                                        })}</h4>

                                                    </div>
                                                )}
                                                {hour &&(
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Horário</h3>
                                                        <h4 className="text-sm text-gray-400">{hour}</h4>

                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <h2 className="text-sm text-gray-400">Barbearia</h2>
                                                    <p className=" text-sm text-gray-400">
                                                        {barbershop.name}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <SheetFooter className="px-5">
                                        <Button disabled={!hour || !date}>Confirmar reserva</Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ServiceItem;
