import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

// funcao pega a funcao handler que esta nominada como POST
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { name, email, password } = body;
        
        // se nao existir
        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400});
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })
    
        return NextResponse.json(user);

    } catch (error) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse('REGISTRATION ERROR', { status: 500});
    }
} 